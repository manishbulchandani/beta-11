import { Request, Response } from 'express'
import mongoose from 'mongoose'
import moment from 'moment';
import cloudinary from '../config/cloudinary';
import User from '../models/user.model'
import TimelineNode, { contentTypes } from '../models/timelineNode.model'

// AddTimelineNode
export const handleAddTimelineNode = async (req: Request, res: Response): Promise<Response> => {
    const {title, topic, message, resources} = req.body;

    try {
      let resrs = resources;
      const files = req.files as Express.Multer.File[];
  
      const uploadPromises = files.map((file: Express.Multer.File) => {
        return cloudinary.uploader.upload(file.path, {
          folder: 'Path Partner'
        });
      });
  
      const uploadResponses = await Promise.all(uploadPromises);
  
      uploadResponses.map(response => {
        resrs.push({
          contentTypes: contentTypes.FILE,
          content: response.secure_url
        })
      });

      const newTimelineNode = new TimelineNode ({
          userId: req.user._id,
          title: title,
          topic: topic,
          message: message,
          resources: resrs
        });       

      const createdTimelineNode = await newTimelineNode.save();

      await User.findByIdAndUpdate(
        req.user._id,
        { $push: { nodes: createdTimelineNode} },
        { new: true }
      ).exec();

      return res.status(201).json({ message: "Timeline node created successfully." })
    } catch (error) {
      if (error instanceof mongoose.Error) {
        return res.status(400).json({ error: error.message });
      } else {
        return res.status(500).json({ error: 'Internal server error' });
      }
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

// export const handleGetFeed = async (req: Request, res: Response) => {
//     try {
//       const userId = req.user.id;

//       const user = await User.findById(userId).select('following');

//       if (!user) return res.status(404).json({ message: 'User not found' });
  
//       const following = user.following;
  
//       const feedPosts = await TimelineNode.find({ author: { $in: following } })
//         .populate('userId')
//         .sort({ createdAt: -1 })
//         .limit(20);
  
//       res.status(200).json(feedPosts);
//     } catch (error) {
//       res.status(500).json({ message: 'Failed to load feed', error });
//     }
//   };