import { Request, Response } from 'express'
import mongoose from 'mongoose'
import axios from 'axios'
import Doubt, { IDoubt, IReply } from '../models/doubt.model'
import User from '../models/user.model'
import Keyword from '../models/keyword.model'

interface DoubtResponse {
  userId?: string;
  username: string;
  content: string;
  threads: IReply[];
  fileUrl?: string;
}

// AddDoubt
export const handleAddDoubt = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { content } = req.body;

        const response = await axios.post('http://192.168.126.38:5001/extract_keywords', { text: content });

        const newDoubt: IDoubt = new Doubt({
            userId: req.user._id,
            tags: response.data.keywords,
            content
        });

        await newDoubt.save();
      
      return res.status(201).json("Doubt post created successfully");
    } catch (error) {
      if (error instanceof mongoose.Error) {
        return res.status(400).json({ error: error.message });
      } else {
        return res.status(500).json({ error: 'Internal server error' });
      }
    }
  };

// GetDoubt
export const handleGetDoubts = async (req: Request, res: Response) => {
    try {
      const keywords = await Keyword.findOne({userId: req.user._id}, 'keywords').exec();

      // console.log(keywords);
      
      const response = await axios.post('http://192.168.126.38:5001/get_relevant_posts', { "user_keywords": keywords?.keywords });
      const posts: DoubtResponse[] = response.data.relevant_posts;
      // console.log(posts.data.relevant_posts);

      // console.log(posts);
      
      const results: DoubtResponse[] = await Promise.all(
        posts.map(async (doubt) => {
          const user = await User.findById(doubt.userId).lean();
          return {
            username: user?.name || "Unknown User",
            content: doubt.content,
            threads: doubt.threads,
            fileUrl: doubt.fileUrl,
          };
        })
      );
  
      return res.status(200).json(results);
    } catch (error) {
      // console.log(error);
      return res.status(500).json({ message: 'Failed to load feed', error });
    }
  };

// AddThread
export const handleAddThread = async (req: Request, res: Response) => {
    const { doubtId, content } = req.body;

    try {
        await Doubt.findByIdAndUpdate(
            doubtId,
            { $push: { threads : { content, userId: req.user._id, name: req.user.name }} },
            { new: true }
        ).exec();

      res.status(200).json("Thread added successfully");
    } catch (error) {
      res.status(500).json({ message: 'Failed to load feed', error });
    }
  };

// GetDoubt
//   export const handleAddDoubt = async (req: Request, res: Response): Promise<Response> => {
//     try {
//         const { content } = req.body;

//         const newDoubt: IDoubt = new Doubt({
//             userId: req.user._id,
//             content
//         });
      
//       return res.status(200).json("Doubt post created successfully");
//     } catch (error) {
//       if (error instanceof mongoose.Error) {
//         return res.status(400).json({ error: error.message });
//       } else {
//         return res.status(500).json({ error: 'Internal server error' });
//       }
//     }
//   };