import { Request, Response } from 'express'
import mongoose from 'mongoose'
import cloudinary from '../config/cloudinary';
import multer from 'multer';
import User, { IUser, IProfessionalExperience } from '../models/user.model'
import TimelineNode, { ITimelineNode, contentTypes, IResource, topics } from '../models/timelineNode.model'

const storage = multer.memoryStorage();
const upload = multer({ storage });


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

      const user = await User.findById(userId).select('connections');

      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const connections = user.connections;
  
      const feedPosts = await TimelineNode.find({ author: { $in: connections } })
        .sort({ createdAt: -1 })
        .limit(20);
  
      res.status(200).json(feedPosts);
    } catch (error) {
      res.status(500).json({ message: 'Failed to load feed', error });
    }
  };