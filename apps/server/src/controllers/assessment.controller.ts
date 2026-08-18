import type { Response } from "express";
import CareerAssessment from "../models/CareerAssessment";
import AssessmentSubmission from "../models/AssessmentSubmission";
import Career from "../models/career.model";
import type { AuthenticatedRequest } from "../middleware/middleware";
import {
  AssessmentValidationError,
  scoreAssessment,
  type AssessmentQuestion,
  type SubmittedAnswer,
} from "../services/assessmentScoring";

// GET /api/assessments/status  — has the logged-in student ever submitted?
export const getAssessmentStatus = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const latest = await AssessmentSubmission.findOne({
      studentId: req.user!.userId,
    })
      .sort({ submittedAt: -1 })
      .select("submittedAt assessmentId")
      .lean();

    return res.status(200).json({
      hasSubmitted: Boolean(latest),
      submittedAt: latest?.submittedAt ?? null,
      assessmentId: latest?.assessmentId ?? null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getActiveAssessment = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const assessment = await CareerAssessment.findOne()
      .sort({ createdAt: -1 })
      .lean();

    if (!assessment) {
      return res
        .status(404)
        .json({ message: "No assessment is available right now" });
    }

    return res.status(200).json({ assessment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

function buildRecommendationResponse(
  submissionRecommendations: Array<{
    careerId: unknown;
    score?: number;
    maxScore?: number;
    matchPercentage: number;
    rank?: number;
    category?: string;
  }>,
  careers: Array<{ _id: unknown; category?: string } & Record<string, unknown>>
) {
  const careerMap = new Map(careers.map((career) => [String(career._id), career]));

  return submissionRecommendations
    .map((entry, index) => {
      const career = careerMap.get(String(entry.careerId));
      if (!career) return null;

      return {
        career,
        score: entry.score ?? 0,
        maxScore: entry.maxScore ?? 0,
        matchPercentage: entry.matchPercentage,
        rank: entry.rank ?? index + 1,
        category: entry.category ?? String(career.category ?? ""),
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
    .sort((a, b) => a.rank - b.rank);
}

export const submitAssessment = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { assessmentId, answers } = req.body || {};

    if (!assessmentId) {
      return res.status(400).json({ message: "Assessment ID is required" });
    }

    const assessment = await CareerAssessment.findById(assessmentId).lean();
    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }

    const questions = assessment.questions as AssessmentQuestion[];
    const careers = await Career.find({ isActive: true }).lean();

    const scoring = scoreAssessment(
      questions,
      answers as SubmittedAnswer[],
      careers
    );

    const recommendations = scoring.rankedCareers;

    const submission = await AssessmentSubmission.create({
      studentId: req.user!.userId,
      assessmentId,
      answers,
      categoryScores: scoring.categoryScores,
      maxCategoryScores: scoring.maxCategoryScores,
      skillScores: scoring.skillScores,
      rankedCategoryResults: scoring.rankedCategoryResults,
      recommendations: recommendations.map((entry) => ({
        careerId: entry.career._id,
        score: entry.score,
        maxScore: entry.maxScore,
        matchPercentage: entry.matchPercentage,
        rank: entry.rank,
        category: entry.category,
      })),
    });

    return res.status(201).json({
      message: "Assessment submitted successfully",
      submittedAt: submission.submittedAt,
      submissionId: submission._id,
      recommendations: buildRecommendationResponse(
        submission.recommendations,
        careers
      ),
      rankedCategoryResults: submission.rankedCategoryResults,
      categoryScores: submission.categoryScores,
      maxCategoryScores: submission.maxCategoryScores,
      skillScores: submission.skillScores,
    });
  } catch (error) {
    if (error instanceof AssessmentValidationError) {
      return res.status(400).json({ message: error.message });
    }

    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getLatestRecommendations = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const submission = await AssessmentSubmission.findOne({
      studentId: req.user!.userId,
    })
      .sort({ submittedAt: -1 })
      .lean();

    if (!submission) {
      return res.status(200).json({
        submittedAt: null,
        recommendations: [],
        rankedCategoryResults: [],
        categoryScores: {},
        maxCategoryScores: {},
        skillScores: {},
      });
    }

    const careerIds = submission.recommendations.map((entry) => entry.careerId);
    const careers = await Career.find({ _id: { $in: careerIds } }).lean();

    return res.status(200).json({
      submittedAt: submission.submittedAt,
      recommendations: buildRecommendationResponse(
        submission.recommendations,
        careers
      ),
      rankedCategoryResults: submission.rankedCategoryResults ?? [],
      categoryScores: submission.categoryScores || {},
      maxCategoryScores: submission.maxCategoryScores || {},
      skillScores: submission.skillScores || {},
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
