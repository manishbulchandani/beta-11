import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";





export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const endPoint = req.originalUrl;
  console.log(endPoint);

  // Allow unauthenticated access to certain endpoints
  if (
    endPoint === "/api/v1/users/register" ||
    endPoint === "/api/v1/users/login" ||
    endPoint === "/api/v1/users/refresh-token"
  ) {
    return next();
  }

  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET_ACCESS!, async (err, userData: any) => {
    if (err) return res.sendStatus(403);

    try {
      const user = await User.findById(userData.userId).exec();
      if (!user) return res.sendStatus(404);

      req.user = user;

      // Check if onboarding is completed before allowing access to certain endpoints
      if (
        !req.user?.onboarding &&
        !["/api/v1/users/getUser", "/api/v1/users/onboarding"].includes(endPoint)
      ) {
        return res
          .status(401)
          .json({ error: "Unauthorized (you haven't completed onboarding)" });
      }

      next();
    } catch (error) {
      console.error("Error fetching user:", error);
      return res.sendStatus(500);
    }
  });
};