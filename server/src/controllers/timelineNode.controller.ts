import { Request, Response } from 'express'
import mongoose from 'mongoose'
import moment from 'moment';
import cloudinary from '../config/cloudinary';
// import multer from 'multer';
import User, { IUser, IProfessionalExperience } from '../models/user.model'
import TimelineNode, { ITimelineNode, contentTypes, IResource, category } from '../models/timelineNode.model'


// AddTimelineNode
export const handleAddTimelineNode = async (req: Request, res: Response): Promise<Response> => {
    if (!req.user?._id) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
  
    try {
      const { title, topics, message, category } = req.body;
      let resources = req.body.resources || [];

      console.log(req.files)

      if (!title || !message || !category) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      if (req.files && req.files.length > 0) {
        try {
          const uploadPromises = req.files.map(async (file) => {
            const b64 = Buffer.from(file.buffer).toString('base64');
            const dataURI = `data:${file.mimetype};base64,${b64}`;
            
            const result = await cloudinary.uploader.upload(dataURI, {
              folder: 'Path Partner',
              resource_type: 'auto'
            });
  
            return {
              contentType: 'FILE' as const,
              content: result.secure_url
            };
          });
  
          const uploadedResources = await Promise.all(uploadPromises);
          resources = [...resources, ...uploadedResources];
        } catch (uploadError) {
          console.error('File upload error:', uploadError);
          return res.status(400).json({ error: 'File upload failed' });
        }
      }
  
      // Create new timeline node
      const newTimelineNode = new TimelineNode({
        userId: req.user._id,
        title,
        topics,
        message,
        category,
        resources
      });
  
      // Save timeline node
      const createdTimelineNode = await newTimelineNode.save();
  
      // Update user's nodes
      await User.findByIdAndUpdate(
        req.user._id,
        { 
          $push: { nodes: createdTimelineNode._id } 
        },
        { new: true }
      );
  
      return res.status(201).json({ 
        message: "Timeline node created successfully",
        node: createdTimelineNode
      });
  
    } catch (error) {
      console.error('Timeline node creation error:', error);
      
      if (error instanceof mongoose.Error) {
        return res.status(400).json({ error: error.message });
      }
      
      if (error instanceof SyntaxError) {
        return res.status(400).json({ error: 'Invalid request data format' });
      }
      
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

// GetTimelineNodeOrderByTime
export const handleGetTimelineNodeOrderByTopic = async (req: Request, res: Response): Promise<Response> => {
    try {
        const allTimelineNodes = await TimelineNode.find({userId: req.user._id, topic: req.body.topic}).sort({ createdAt: -1 }).limit(10).exec();

    return res.status(200).json(allTimelineNodes);
    } catch (error) {
      if (error instanceof mongoose.Error) {
        return res.status(400).json({ error: error.message });
      } else {
        return res.status(500).json({ error: 'Internal server error' });
      }
    }
  };

// GetFeed
export const handleGetFeed = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select('following');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const following = user.following;

    const feedPosts = await TimelineNode.find({ userId: { $in: following } })
      .populate('userId')
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    const formattedFeedPosts = feedPosts.map(post => {
      const createdAt = post.createdAt;
      let timestamp;

      const daysDifference = moment().diff(moment(createdAt), 'days');

      if (daysDifference < 3) {
        timestamp = moment(createdAt).fromNow();
      } else {
        timestamp = moment(createdAt).format('D MMM YYYY');
      }

      return { ...post, timestamp };
    });

    res.status(200).json(formattedFeedPosts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load feed', error });
  }
};

// SearchTimelineNodes
export const handleSearchTimelineNodesByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.body;

    const timelineNodes = await TimelineNode.aggregate([
        { $match: { category } },
        { $sort: { createdAt: -1 } },
        {
            $group: {
                _id: "$userId",
                nodes: { $push: "$$ROOT" }
            }
        }
    ]);

    const groupedResults = timelineNodes.map((group) => {
        const paginatedNodes = [];
        for (let i = 0; i < group.nodes.length; i += 5) {
            paginatedNodes.push(group.nodes.slice(i, i + 5));
        }
        return { userId: group._id, name: req.user.name, bio: req.user.bio, timelineNodes: paginatedNodes };
    });

    res.status(200).json(groupedResults);
  } catch (error) {
    res.status(500).json({ message: 'Interval Server Error', error });
  }
};