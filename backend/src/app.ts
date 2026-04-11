import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import applicationRoutes from "./routes/applicationRoutes";
import aiRoutes from "./routes/aiRoutes";
import { errorHandler } from "./middleware/errorMiddleware";
import { notFound } from "./middleware/notFound";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/ai", aiRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;