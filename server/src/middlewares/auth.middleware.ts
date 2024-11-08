import { NextFunction, Request, Response } from "express";
import User from '../models/user.model';
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const endPoint = req.originalUrl;

  console.log(endPoint);

  if (endPoint == "api/v1/register/" || endPoint == "api/v1/login/" || endPoint == "api/v1/refresh-token/") next();

  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET_ACCESS!, async (err, userId) => {
    if (err) return res.sendStatus(403);
    const user = await User.find({_id: userId}).exec();
    req.user = user;
  });

  if (!req.user.onboarding) {
    return res.status(401).json({ error: "Unauthorised (you haven't done onboarding" });
  }

  next();
};

// export const authorizeRoles = (...roles: UserRole[]) => (req: Request, res: Response, next: NextFunction) => {
//   if (!req.user || !roles.includes(req.user.role)) {
//     return res.sendStatus(403); // Forbidden
//   }
//   next();
// };
