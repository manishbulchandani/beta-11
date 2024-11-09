import { Request, Response } from "express";
import User, { IUser } from "../../models/user.model";
import jwt from "jsonwebtoken"

export const handleRegisterUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Missing required fields",
        details: {
          email: !email ? "Email is required" : null,
          password: !password ? "Password is required" : null
        }
      });
    }

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //   return res.status(400).json({
    //     error: "Invalid email format"
    //   });
    // }

    // Check if password meets minimum requirements
    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters long"
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        error: "Email already registered"
      });
    }

    // Create new user
    const user = new User({
      email,
      password,
      onboarding: false 
    });

    await user.save();

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    res.status(201).json({
      message: "User registered successfully",
      data: {
        userId: user._id,
        email: user.email,
        onboarding: user.onboarding
      },
      tokens: {
        accessToken,
        refreshToken
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle specific MongoDB errors
    // if (error.code === 11000) {
    //   const field = Object.keys(error.keyPattern)[0];
    //   return res.status(409).json({
    //     error: `Duplicate ${field} error`,
    //     details: `The ${field} provided is already in use`
    //   });
    // }

    // Generic error response
    res.status(500).json({
      error: "Registration failed",
      details: "An unexpected error occurred during registration"
    });
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
