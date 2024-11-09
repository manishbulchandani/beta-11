import { Request, Response } from 'express'
import mongoose from 'mongoose'
import User, { IUser, IProfessionalExperience } from '../models/user.model'
import { SocketAddress } from 'net';

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
        const {userId} = req.body;
        const userProfile = await User.findById(userId ?? req?.user?._id).select('-password').populate('nodes').exec();
        
        return res.status(200).json(userProfile);
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
    const { firstName, lastName, phone, address, collegeOrInstituteName, bio, degree, graduationYear, professionalExperiences } = req.body;
  
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
  
      return res.status(200).json({ error: 'User onboarded successfully.'});
    } catch (error) {
      if (error instanceof mongoose.Error) {
        return res.status(400).json({ error: error.message });
      } else {
        return res.status(500).json({ error: 'Internal server error' });
      }
    }
  };