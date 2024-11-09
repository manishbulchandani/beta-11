import { Request, Response } from 'express'
import mongoose from 'mongoose'
import cloudinary from '../config/cloudinary'
import multer from 'multer';
import User, { IUser, IProfessionalExperience } from '../models/user.model'
import TimelineNode, { ITimelineNode, contentTypes, IResource, topics } from '../models/timelineNode.model'

const storage = multer.memoryStorage();
const upload = multer({ storage });


// AddTimelineNode
export const handleAddTimelineNode = async (req: Request, res: Response): Promise<Response> => {
    const {title, topic, message, resources} = req.body;

    try {
      let resrs = [];

      for (const resource of resources) {
        if (resource.contentType == contentTypes.FILE) {
            const result = cloudinary.uploader.upload_stream(
              { folder: 'Path Partner' },
              async (error, result) => {
                if (error) {
                  return res.status(500).json({ error: error.message });
                }
                const uploadedFileUrl = result?.secure_url;

                const resrc = {
                  contentType: resource.contentType,
                  content: uploadedFileUrl
                } as IResource

                resrs.push(resrc);
              }
            );
        }
        else {
          const resrc = {
            contentType: resource.contentType,
            content: resource.content
          } as IResource

          resrs.push(resrc);
        }
      }

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