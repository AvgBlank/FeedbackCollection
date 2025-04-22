import express from "express";
import mainRoutes from "./routes/main.routes";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  }),
);

// Routes
app.use("/", mainRoutes);

// Health check route
app.get("/health", (_, res) => {
  res.status(200).json("Healthy");
});

// Start the server
app.listen(process.env.PORT || 5269, () => {
  console.log(`Server is listening on port ${process.env.PORT || 5269}`);
});
