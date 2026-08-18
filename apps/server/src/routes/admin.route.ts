import express from 'express';
import User from '../models/user.model';
import Resource from '../models/resource.model';
import AssessmentSubmission from '../models/AssessmentSubmission';
import CareerAssessment from '../models/CareerAssessment';
import SavedCareer from '../models/SavedCareer';
import Career from '../models/career.model';
import { adminMiddleware } from '../middleware/middleware';

const router = express.Router();

// All admin routes require admin role
router.use(adminMiddleware);

// Dashboard analytics with real aggregations
router.get('/dashboard', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAssessments = await AssessmentSubmission.countDocuments();
    const totalSavedCareers = await SavedCareer.countDocuments();
    const totalResources = await Resource.countDocuments();
    const totalCareers = await Career.countDocuments({ isActive: true });

    // Get weekly engagement data (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const dailyUsers = await User.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const dailyAssessments = await AssessmentSubmission.aggregate([
      { $match: { submittedAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$submittedAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Format engagement data for chart
    const engagementMap = new Map();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayName = days[date.getDay()];
      engagementMap.set(dateStr, { name: dayName, students: 0, assessments: 0 });
    }

    dailyUsers.forEach((item) => {
      if (engagementMap.has(item._id)) {
        engagementMap.get(item._id).students = item.count;
      }
    });

    dailyAssessments.forEach((item) => {
      if (engagementMap.has(item._id)) {
        engagementMap.get(item._id).assessments = item.count;
      }
    });

    const engagementData = Array.from(engagementMap.values());

    // Get recent users
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('-password')
      .lean();

    // Get top saved careers
    const topSavedCareers = await SavedCareer.aggregate([
      {
        $group: {
          _id: '$careerId',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    const careerIds = topSavedCareers.map((item) => item._id);
    const careers = await Career.find({ _id: { $in: careerIds } }).lean();
    const careerMap = new Map(careers.map((c) => [String(c._id), c]));

    const topCareers = topSavedCareers
      .map((item) => ({
        career: careerMap.get(String(item._id)),
        count: item.count,
      }))
      .filter((item) => item.career);

    res.json({
      totalUsers,
      totalAssessments,
      totalSavedCareers,
      totalResources,
      totalCareers,
      engagementData,
      recentUsers,
      topCareers,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get all users with search, pagination
router.get('/users', async (req, res) => {
  try {
    const { search, page = '1', limit = '20', role } = req.query;
    
    const filter: any = {};
    
    if (search && typeof search === 'string') {
      filter.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    if (role && typeof role === 'string') {
      filter.role = role;
    }

    const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit as string, 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    const [users, total] = await Promise.all([
      User.find(filter)
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      User.countDocuments(filter),
    ]);

    res.json({
      users,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password').lean();
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Create a new user/student (Admin)
router.post('/users', async (req, res) => {
  try {
    const { fullName, email, password, role = 'user' } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Full name, email, and password are required' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const bcrypt = await import('bcrypt');
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
    });

    const userResponse = newUser.toObject();
    delete (userResponse as any).password;

    res.status(201).json({
      user: userResponse,
      message: 'User created successfully',
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Update user
router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, role } = req.body;

    const updateData: any = {};
    if (fullName) updateData.fullName = fullName;
    if (email) updateData.email = email.toLowerCase();
    if (role) updateData.role = role;

    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user,
      message: 'User updated successfully',
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get assessment analytics
router.get('/assessments/analytics', async (req, res) => {
  try {
    const totalAssessments = await CareerAssessment.countDocuments();
    const totalSubmissions = await AssessmentSubmission.countDocuments();
    
    const assessments = await CareerAssessment.find()
      .sort({ createdAt: -1 })
      .lean();

    const assessmentStats = await Promise.all(
      assessments.map(async (assessment) => {
        const submissions = await AssessmentSubmission.countDocuments({
          assessmentId: assessment._id,
        });
        return {
          ...assessment,
          submissions,
        };
      })
    );

    res.json({
      totalAssessments,
      totalSubmissions,
      assessments: assessmentStats,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Career.distinct('category');
    const categoryStats = await Promise.all(
      categories.map(async (category) => {
        const count = await Career.countDocuments({ category, isActive: true });
        return { name: category, careerCount: count };
      })
    );

    res.json({ categories: categoryStats });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
