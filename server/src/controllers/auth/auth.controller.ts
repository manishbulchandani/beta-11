import { Request, Response } from "express";
import User, { IUser } from "../../models/user.model";
import jwt from "jsonwebtoken"

export const handleRegisterUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Registration failed" });
  }
};

export const handleLoginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user: IUser | null = await User.findOne({ email });
    if (!user || !(await user.isPasswordMatch(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
   
    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

export const handleRefreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token required" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH!) as jwt.JwtPayload;
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(403).json({ error: "Invalid refresh token" });

    const newAccessToken = user.generateAccessToken();
    res.json({ accessToken: newAccessToken });
  } catch {
    res.status(403).json({ error: "Invalid refresh token" });
  }
};
