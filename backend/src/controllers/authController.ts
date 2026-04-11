import { Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { AuthRequest } from "../types/auth";

const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign({ userId }, secret, { expiresIn: "7d" });
};

export const registerUser = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  if (password.length < 6) {
    res.status(400).json({ message: "Password must be at least 6 characters" });
    return;
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });

  if (existingUser) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  const user = await User.create({
    email: email.toLowerCase(),
    password
  });

  res.status(201).json({
    message: "User registered successfully",
    token: generateToken(user._id.toString()),
    user: {
      id: user._id,
      email: user.email
    }
  });
};

export const loginUser = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  res.status(200).json({
    message: "Login successful",
    token: generateToken(user._id.toString()),
    user: {
      id: user._id,
      email: user.email
    }
  });
};

export const getMe = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const user = await User.findById(req.user.userId).select("-password");

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.status(200).json(user);
};