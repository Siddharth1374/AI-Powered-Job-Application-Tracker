import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/auth";

interface JwtPayload {
  userId: string;
}

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  // Check if token exists
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Not authorized, token missing" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    // Verify token
    const decoded = jwt.verify(token, secret) as JwtPayload;

    // Attach user to request
    req.user = {
      userId: decoded.userId
    };

    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};