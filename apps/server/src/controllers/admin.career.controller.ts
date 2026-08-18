import type { Request, Response } from 'express';
import Career from '../models/career.model';
import mongoose from 'mongoose';

// Create a new career (Admin only)
export const createCareer = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const {
      title,
      description,
      category,
      requiredSkills,
      educationRequired,
      averageSalary,
      growthOutlook,
      workEnvironment,
      roadmap,
    } = req.body;

    if (!title || !description || !category || !educationRequired || !averageSalary) {
      return res.status(400).json({
        message: 'Missing required fields',
      });
    }

    const career = await Career.create({
      title,
      description,
      category,
      requiredSkills: requiredSkills || [],
      educationRequired,
      averageSalary,
      growthOutlook: growthOutlook || 'Stable',
      workEnvironment: workEnvironment || 'Office',
      roadmap,
      isActive: true,
    });

    return res.status(201).json({
      career,
      message: 'Career created successfully',
    });
  } catch (err: unknown) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// Update a career (Admin only)
export const updateCareer = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'Invalid career ID',
      });
    }

    const career = await Career.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!career) {
      return res.status(404).json({
        message: 'Career not found',
      });
    }

    return res.status(200).json({
      career,
      message: 'Career updated successfully',
    });
  } catch (err: unknown) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// Delete a career (Admin only)
export const deleteCareer = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'Invalid career ID',
      });
    }

    const career = await Career.findByIdAndDelete(id);

    if (!career) {
      return res.status(404).json({
        message: 'Career not found',
      });
    }

    return res.status(200).json({
      message: 'Career deleted successfully',
    });
  } catch (err: unknown) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};
