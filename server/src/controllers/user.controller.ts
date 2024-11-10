import { Request, Response } from 'express'
import mongoose from 'mongoose'
import User, { IUser, IProfessionalExperience } from '../models/user.model'
import Keyword, { IKeyword } from '../models/keyword.model'

// GetUser
export const handleGetUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const getUserRes = {
            name: req.user.name,
            email: req.user.email,
            onboarding: req.user.onboarding,
            collegeOrInstitueName: req.user.collegeOrInstitueName,
            bio: req.user.bio
        }
      return res.status(200).json(getUserRes);
    } catch (error) {
      if (error instanceof mongoose.Error) {
        return res.status(400).json({ error: error.message });
      } else {
        return res.status(500).json({ error: 'Internal server error' });
      }
    }
  };

// GetProfle
export const handleGetProfileById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.body.userId || req.user._id;

    const userProfile = await User.findById(userId).select('-password').populate('nodes').exec();

    if (!userProfile) return res.status(404).json("User not found");

    const isFollowing = userProfile.following.includes(req.user._id);
    const isFollower = userProfile.followers.includes(req.user._id);

    return res.status(200).json({ ...userProfile.toObject(), isFollower, isFollowing });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// Onboarding
export const handleDoOnboarding = async (req: Request, res: Response): Promise<Response> => {
    const { firstName, lastName, phone, address, collegeOrInstituteName, bio, degree, graduationYear, professionalExperiences, skills } = req.body;
  
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized (user not found)' });
      }
  
      if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
        return res.status(400).json({ error: 'Invalid Issuer ID' });
      }
  
    //   let isValid = true;
  
    //   if (category === 'INDIVIDUAL') {
    //     isValid = issuerName && designation && address;
    //   } else if (category === 'COMPANY') {
    //     isValid = issuerName && companyName && CIN && designation && address;
    //   } else if (category === 'INSTITUTE') {
    //     isValid = issuerName && instituteName && designation && address;
    //   } else {
    //     isValid = false;
    //   }
  
    //   if (!isValid) {
    //     return res.status(400).json({ error: 'All fields are required' });
    //   }
  
      const updatedIssuer = await User.findByIdAndUpdate(
        req.user._id,
        { 
          onboarding: true,
          name: firstName + " " + lastName,
          phone: phone,
          address: address,
          bio: bio,
          skills: skills,
          degree: degree,
          graduationYear: graduationYear,
          collegeOrInstituteName: collegeOrInstituteName,
          professionalExperiences: professionalExperiences
        },
        { new: true }
      ).exec();
  
      if (!updatedIssuer) {
        return res.status(404).json({ error: 'User not found' });
      }

      const newKeyword: IKeyword = new Keyword({
        userId: req.user._id,
        keywords: skills
      });
  
      await newKeyword.save();
  
      return res.status(200).json({ error: 'User onboarded successfully.'});
    } catch (error) {
      if (error instanceof mongoose.Error) {
        return res.status(400).json({ error: error.message });
      } else {
        return res.status(500).json({ error: 'Internal server error' });
      }
    }
  };

// Follow
export const handleFollow = async (req: Request, res: Response): Promise<Response> => {
  const { otherUserId } = req.body;

  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized (user not found)' });
    }

    if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
      return res.status(400).json({ error: 'Invalid Issuer ID' });
    }

    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { following : otherUserId} },
      { new: true }
    ).exec();

    await User.findByIdAndUpdate(
      otherUserId,
      { $push: { followers : req.user._id} },
      { new: true }
    ).exec();

    return res.status(200).json({ error: 'task compelted successfully.'});
  } catch (error) {
    if (error instanceof mongoose.Error) {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// 
// export const handleAddFavouriteTimelineNode = async (req: Request, res: Response): Promise<Response> => {
//   const { otherUserId, category } = req.body;

//   try {
//     if (!req.user) {
//       return res.status(401).json({ error: 'Unauthorized (user not found)' });
//     }

//     if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
//       return res.status(400).json({ error: 'Invalid Issuer ID' });
//     }

//     await User.findByIdAndUpdate(
//       req.user._id,
//       { $push: { following : otherUserId} },
//       { new: true }
//     ).exec();

//     await User.findByIdAndUpdate(
//       otherUserId,
//       { $push: { followers : req.user._id} },
//       { new: true }
//     ).exec();

//     return res.status(200).json({ error: 'task compelted successfully.'});
//   } catch (error) {
//     if (error instanceof mongoose.Error) {
//       return res.status(400).json({ error: error.message });
//     } else {
//       return res.status(500).json({ error: 'Internal server error' });
//     }
//   }
// };