import { Router } from "express";
import prisma from "../config/prisma";
import authMiddleware from "../middlewares/auth.middleware";

const mainRoutes = Router();

interface Feedback {
  name: string;
  email: string;
  phone: string;
  rating: number;
  feedback: string;
}

// Post route for submitting feedback
mainRoutes.post("/", async (req, res) => {
  const { name, email, phone, rating, feedback }: Feedback = req.body;
  if (!name || !email || !phone || !rating) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  try {
    await prisma.feedback.create({
      data: { name, email, phone, rating, feedback },
    });
    res.status(200).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get route to get all submitted feedbacks
mainRoutes.get("/", authMiddleware, async (_, res) => {
  try {
    const feedbacks = await prisma.feedback.findMany();
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
});

export default mainRoutes;
