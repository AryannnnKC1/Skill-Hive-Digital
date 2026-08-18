import type { Response } from 'express';
import type { AuthenticatedRequest } from '../middleware/middleware';
import StudentProfile from '../models/studentProfile.model';
import User from '../models/user.model';

/**
 * GET /api/profile
 * Returns the authenticated user's profile.
 * If no profile document exists yet, creates one from the User record.
 */
export const getProfile = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user!.userId;

    let profile = await StudentProfile.findOne({ userId });

    if (!profile) {
      // Bootstrap a profile from the User record
      const user = await User.findById(userId).select('fullName email');
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      profile = await StudentProfile.create({
        userId,
        fullName: user.fullName,
        email: user.email,
      });
    }

    res.json({ profile });
  } catch (err: any) {
    console.error('getProfile error:', err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

/**
 * PUT /api/profile
 * Updates the authenticated user's profile.
 * Validates fullName (letters+spaces only) and phone (7-15 digits, optional) server-side.
 */
export const updateProfile = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const payload = req.body as Record<string, unknown>;
    const allowedFields = [
      'fullName',
      'phone',
      'dateOfBirth',
      'gender',
      'avatar',
      'bio',
      'educationLevel',
      'institution',
      'major',
      'graduationYear',
      'skills',
      'careerGoal',
      'preferredIndustry',
    ] as const;
    const updates: Record<string, string> = {};

    for (const field of allowedFields) {
      const value = payload[field];
      if (typeof value === 'string') {
        updates[field] = value.trim();
      }
    }

    // --- Server-side validation ---
    const errors: Record<string, string> = {};

    if (updates.fullName !== undefined) {
      const name = (updates.fullName as string).trim();
      if (!name) {
        errors.fullName = 'Full name is required';
      } else if (!/^[A-Za-z\s]+$/.test(name)) {
        errors.fullName = 'Full name can only contain letters and spaces';
      }
    }

    if (updates.phone !== undefined) {
      const phone = (updates.phone as string).trim();
      if (phone !== '' && !/^\d{7,15}$/.test(phone)) {
        errors.phone = 'Phone number must be 7–15 digits';
      }
    }

    if (Object.keys(errors).length > 0) {
      res.status(400).json({ message: 'Validation failed', errors });
      return;
    }

    let profile = await StudentProfile.findOneAndUpdate(
      { userId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!profile) {
      // If no profile yet, create one (edge case: first save via PUT)
      const user = await User.findById(userId).select('fullName email');
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      profile = await StudentProfile.create({
        userId,
        fullName: user.fullName,
        email: user.email,
        ...updates,
      });
    }

    res.json({ profile });
  } catch (err: any) {
    console.error('updateProfile error:', err);

    // Surface Mongoose validation errors nicely
    if (err.name === 'ValidationError') {
      const errors: Record<string, string> = {};
      for (const field of Object.keys(err.errors)) {
        errors[field] = err.errors[field].message;
      }
      res.status(400).json({ message: 'Validation failed', errors });
      return;
    }

    res.status(500).json({ message: err.message || 'Server error' });
  }
};
