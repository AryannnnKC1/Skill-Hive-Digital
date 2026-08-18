import type { Request, Response } from 'express'
import mongoose from 'mongoose'
import Resource from '../models/resource.model'

// Get resources with optional filters
export const getResources = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const {
      careerField,
      skill,
      type,
      difficulty,
      search,
    } = req.query

    const filter: Record<string, any> = {
      isActive: true,
    }

    if (careerField && typeof careerField === 'string') {
      filter.careerFields = careerField
    }

    if (skill && typeof skill === 'string') {
      filter.skills = skill
    }

    if (type && typeof type === 'string') {
      filter.type = type
    }

    if (difficulty && typeof difficulty === 'string') {
      filter.difficulty = difficulty
    }

    if (search && typeof search === 'string') {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { provider: { $regex: search, $options: 'i' } },
      ]
    }

    const resources = await Resource.find(filter)
      .sort({ createdAt: -1 })
      .lean()

    return res.status(200).json({
      resources,
    })
  } catch (err: unknown) {
    console.error(err)

    return res.status(500).json({
      message: 'Internal server error',
    })
  }
}

// Create a new resource (Admin only)
export const createResource = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { title, description, type, provider, url, difficulty, careerFields, skills, careerIds } = req.body;

    if (!title || !description || !type || !provider || !url || !difficulty) {
      return res.status(400).json({
        message: 'Missing required fields: title, description, type, provider, url, difficulty',
      });
    }

    const resource = await Resource.create({
      title,
      description,
      type,
      provider,
      url,
      difficulty,
      careerFields: careerFields || [],
      skills: skills || [],
      careerIds: careerIds || [],
      isActive: true,
    });

    return res.status(201).json({
      resource,
      message: 'Resource created successfully',
    });
  } catch (err: unknown) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// Update a resource (Admin only)
export const updateResource = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const { title, description, type, provider, url, difficulty, careerFields, skills, careerIds, isActive } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'Invalid resource ID',
      });
    }

    const resource = await Resource.findByIdAndUpdate(
      id,
      { title, description, type, provider, url, difficulty, careerFields, skills, careerIds, isActive },
      { new: true, runValidators: true }
    );

    if (!resource) {
      return res.status(404).json({
        message: 'Resource not found',
      });
    }

    return res.status(200).json({
      resource,
      message: 'Resource updated successfully',
    });
  } catch (err: unknown) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// Delete a resource (Admin only)
export const deleteResource = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'Invalid resource ID',
      });
    }

    const resource = await Resource.findByIdAndDelete(id);

    if (!resource) {
      return res.status(404).json({
        message: 'Resource not found',
      });
    }

    return res.status(200).json({
      message: 'Resource deleted successfully',
    });
  } catch (err: unknown) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// Get one resource by ID
export const getResourceById = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'Invalid resource ID',
      })
    }

    const resource = await Resource.findOne({
      _id: id,
      isActive: true,
    }).lean()

    if (!resource) {
      return res.status(404).json({
        message: 'Resource not found',
      })
    }

    return res.status(200).json({
      resource,
    })
  } catch (err: unknown) {
    console.error(err)

    return res.status(500).json({
      message: 'Internal server error',
    })
  }
}