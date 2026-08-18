import type { Request, Response } from 'express';
import CareerAssessment from '../models/CareerAssessment';
import AssessmentSubmission from '../models/AssessmentSubmission';
import mongoose from 'mongoose';

// Create a new assessment (Admin only)
export const createAssessment = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { title, questions } = req.body;

    if (!title || !questions || !Array.isArray(questions)) {
      return res.status(400).json({
        message: 'Title and questions array are required',
      });
    }

    const assessment = await CareerAssessment.create({
      title,
      questions,
    });

    return res.status(201).json({
      assessment,
      message: 'Assessment created successfully',
    });
  } catch (err: unknown) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// Get all assessments (Admin only)
export const getAllAssessments = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const assessments = await CareerAssessment.find().sort({ createdAt: -1 }).lean();

    const assessmentsWithStats = await Promise.all(
      assessments.map(async (assessment) => {
        const submissionCount = await AssessmentSubmission.countDocuments({
          assessmentId: assessment._id,
        });
        return {
          ...assessment,
          questions: (assessment.questions as any[]).length,
          completions: submissionCount,
        };
      })
    );

    return res.status(200).json({
      assessments: assessmentsWithStats,
    });
  } catch (err: unknown) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// Update an assessment (Admin only)
export const updateAssessment = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const { title, questions } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'Invalid assessment ID',
      });
    }

    const assessment = await CareerAssessment.findByIdAndUpdate(
      id,
      { title, questions },
      { new: true, runValidators: true }
    );

    if (!assessment) {
      return res.status(404).json({
        message: 'Assessment not found',
      });
    }

    return res.status(200).json({
      assessment,
      message: 'Assessment updated successfully',
    });
  } catch (err: unknown) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// Delete an assessment (Admin only)
export const deleteAssessment = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'Invalid assessment ID',
      });
    }

    const assessment = await CareerAssessment.findByIdAndDelete(id);

    if (!assessment) {
      return res.status(404).json({
        message: 'Assessment not found',
      });
    }

    return res.status(200).json({
      message: 'Assessment deleted successfully',
    });
  } catch (err: unknown) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// Get assessment submissions/analytics (Admin only)
export const getAssessmentSubmissions = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'Invalid assessment ID',
      });
    }

    const submissions = await AssessmentSubmission.find({ assessmentId: id })
      .populate('studentId', 'fullName email')
      .sort({ submittedAt: -1 })
      .lean();

    return res.status(200).json({
      submissions,
    });
  } catch (err: unknown) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};
