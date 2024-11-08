import jwt from "jsonwebtoken";
import { UserRole } from "../models/user.model";



export const generateAccessToken = (userId:string, role:UserRole) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET_ACCESS!, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES,
  });
};

export const generateRefreshToken = (userId:string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET_REFRESH!, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES,
  });
};

