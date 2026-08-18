import express from "express";
import {
  submitAssessment,
  getActiveAssessment,
  getLatestRecommendations,
  getAssessmentStatus,
} from "../controllers/assessment.controller";
import {
  createAssessment,
  getAllAssessments,
  updateAssessment,
  deleteAssessment,
  getAssessmentSubmissions,
} from "../controllers/admin.assessment.controller";

import { authMiddleware, adminMiddleware } from "../middleware/middleware";

const router = express.Router();

router.get("/active", authMiddleware, getActiveAssessment);
router.get("/status", authMiddleware, getAssessmentStatus);
router.post("/submit", authMiddleware, submitAssessment);
router.get("/recommendations", authMiddleware, getLatestRecommendations);

// Admin-only assessment management routes
router.get("/all", adminMiddleware, getAllAssessments);
router.post("/", adminMiddleware, createAssessment);
router.put("/:id", adminMiddleware, updateAssessment);
router.delete("/:id", adminMiddleware, deleteAssessment);
router.get("/:id/submissions", adminMiddleware, getAssessmentSubmissions);

export default router;