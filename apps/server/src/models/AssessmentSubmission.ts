import mongoose, { Schema, Document } from "mongoose";

export interface IRecommendationEntry {
  careerId: mongoose.Types.ObjectId;
  score: number;
  maxScore: number;
  matchPercentage: number;
  rank: number;
  category: string;
}

export interface ICategoryResultEntry {
  category: string;
  score: number;
  maxScore: number;
  percentage: number;
  rank: number;
}

export interface IAssessmentSubmission extends Document {
  studentId: mongoose.Types.ObjectId;
  assessmentId: mongoose.Types.ObjectId;

  answers: {
    questionId: string;
    optionId: string;
  }[];

  categoryScores: Record<string, number>;
  maxCategoryScores: Record<string, number>;
  skillScores: Record<string, number>;
  rankedCategoryResults: ICategoryResultEntry[];
  recommendations: IRecommendationEntry[];

  submittedAt: Date;
}

const AssessmentSubmissionSchema = new Schema<IAssessmentSubmission>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assessmentId: {
      type: Schema.Types.ObjectId,
      ref: "CareerAssessment",
      required: true,
    },

    answers: [
      {
        questionId: { type: String, required: true },
        optionId: { type: String, required: true },
      },
    ],

    categoryScores: {
      type: Schema.Types.Mixed,
      default: {},
    },

    maxCategoryScores: {
      type: Schema.Types.Mixed,
      default: {},
    },

    skillScores: {
      type: Schema.Types.Mixed,
      default: {},
    },

    rankedCategoryResults: [
      {
        category: { type: String, required: true },
        score: { type: Number, required: true },
        maxScore: { type: Number, required: true },
        percentage: { type: Number, required: true },
        rank: { type: Number, required: true },
      },
    ],

    recommendations: [
      {
        careerId: { type: Schema.Types.ObjectId, ref: "Career", required: true },
        score: { type: Number, required: true },
        maxScore: { type: Number, required: true },
        matchPercentage: { type: Number, required: true },
        rank: { type: Number, required: true },
        category: { type: String, required: true },
      },
    ],

    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IAssessmentSubmission>(
  "AssessmentSubmission",
  AssessmentSubmissionSchema
);
