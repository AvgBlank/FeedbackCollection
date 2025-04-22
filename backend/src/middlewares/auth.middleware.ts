import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Check auth token
  const token = req.headers.authorization;
  if (!token) {
    res.status(400).json({ message: "Invalid Authorization header format" });
    return;
  }
  if (token == process.env.AUTH_TOKEN) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
  return;
};

export default authMiddleware;
