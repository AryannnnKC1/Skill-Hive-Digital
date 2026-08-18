import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { authMiddleware } from '../middleware/middleware';
import { getProfile, updateProfile } from '../controllers/profile.controller';

const router = Router();

const profileRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

// All profile routes require authentication
router.get('/', profileRateLimiter, authMiddleware, getProfile);
router.put('/', profileRateLimiter, authMiddleware, updateProfile);

export default router;
