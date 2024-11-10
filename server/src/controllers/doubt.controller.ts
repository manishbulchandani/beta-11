import { Request, Response } from 'express'
import mongoose from 'mongoose'
import axios from 'axios';
import Doubt, { IDoubt, IReply } from '../models/doubt.model'
import User from '../models/user.model'
import cloudinary from '../config/cloudinary';

interface DoubtResponse {
  _id:string;
  userId?: string;
  username: string;
  content: string;
  threads: IReply[];
  fileUrl?: string;
}

export const handleAddDoubt = async (req: Request, res: Response): Promise<Response> => {
  if (!req.user?._id) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    const { content } = req.body;
    let fileUrl: string | undefined;

    // Extract keywords
    const response = await axios.post('http://192.168.126.38:5001/extract_keywords', { text: content });

    // Handle file upload to Cloudinary if file exists
    if (req.file) {
      try {
        // Convert buffer to base64
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const dataURI = `data:${req.file.mimetype};base64,${b64}`;

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(dataURI, {
          folder: "Doubts",
          resource_type: "auto" 
        });

        fileUrl = result.secure_url;
      } catch (uploadError) {
        console.error("File upload error:", uploadError);
        return res.status(400).json({ error: "File upload failed" });
      }
    }

    // Create new doubt
    const newDoubt: IDoubt = new Doubt({
      userId: req.user._id,
      tags: response.data.keywords,
      content,
      fileUrl
    });

    // Save doubt
    const createdDoubt = await newDoubt.save();

    return res.status(201).json({
      message: "Doubt post created successfully",
      doubt: createdDoubt
    });

  } catch (error) {
    console.error("Doubt creation error:", error);

    if (error instanceof mongoose.Error) {
      return res.status(400).json({ error: error.message });
    }

    if (error instanceof SyntaxError) {
      return res.status(400).json({ error: "Invalid request data format" });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};

// GetDoubts
export const handleGetDoubts = async (req: Request, res: Response) => {
    try {
      // const {user_keywords} = req.body;
      const user_keywords=["asdf","programming","python"]
      const response = await axios.post('http://192.168.126.38:5001/get_relevant_posts', { user_keywords });
      console.log(response)
      // console.log(posts.data.relevant_posts);
      
      
      const posts: DoubtResponse[] = response.data.relevant_posts;

      const results: DoubtResponse[] = await Promise.all(
        posts.map(async (doubt) => {
          const user = await User.findById(doubt.userId).lean();
          return {
            _id:doubt._id,
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



  
export const handleAddThread = async (req: Request, res: Response) => {
  const { doubtId, content } = req.body;

  try {
    const date = Date.now();
    const updatedDoubt = await Doubt.findByIdAndUpdate(
      doubtId,
      { 
        $push: { 
          threads: { 
            $each: [{
              content,
              userId: req.user._id,
              username: req.user?.name,
              date: date
            }],
            $position: 0 
          }
        }
      },
      { new: true }
    ).exec();

    console.log(updatedDoubt);

    if (!updatedDoubt) {
      return res.status(404).json({ message: 'Doubt not found' });
    }

    res.status(200).json({ message: "Thread added successfully", updatedDoubt });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add thread', error });
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