import { Request, Response } from 'express'
import mongoose from 'mongoose'
import User, { IUser, IProfessionalExperience } from '../models/user.model'
import TimelineNode, { ITimelineNode, contentTypes, topics } from '../models/timelineNode.model'


// AddTimelineNode
export const handleAddTimelineNode = async (req: Request, res: Response): Promise<Response> => {
    const {title, topic, message, contentType, content} = req.body;

    if (contentType == contentTypes.FILE) {
        // upload file on cluodinary
    }

    try {
        const newTimelineNode = new TimelineNode ({
            userId: req.user._id,
            title: title,
            topic: topic,
            messege: message,
            contentType: contentType,
            content: content
          });

        const createdTimelineNode = await newTimelineNode.save();

        await User.findByIdAndUpdate(
            req.user._id,
            { $push: { nodes: createdTimelineNode._id } },
            { new: true }
        ).exec();

    return res.status(201).json({ message: "Timeline node created successfully." });
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