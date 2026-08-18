import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./lib/db";

import authRoutes from "./routes/auth.route";
import careerRoutes from "./routes/career.route";
import assessmentRoutes from "./routes/assessment.route";
import resourceRoutes from "./routes/resource.route";
import adminRoutes from "./routes/admin.route";
import profileRoutes from "./routes/profile.route";

// Load .env from project root
dotenv.config({
  path: "../../.env",
});

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/profile", profileRoutes);

// Error handling middleware
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Server error",
  });
});

const port = process.env.PORT || 3001;

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await connectDB();
});