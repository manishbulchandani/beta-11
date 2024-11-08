import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserRole } from "../models/user.model";

interface UserPayload {
  userId: string;
  role: UserRole;
}


export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET_ACCESS!, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user as UserPayload;
    next();
  });
};

export const authorizeRoles = (...roles: UserRole[]) => (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.sendStatus(403); // Forbidden
  }
  next();
};
