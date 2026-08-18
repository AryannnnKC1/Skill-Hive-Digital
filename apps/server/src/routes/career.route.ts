import { Router } from 'express';
import {
  searchCareers,
  getSuggestions,
  getCategories,
  getCareerById,
} from '../controllers/career.controller';
import {
  createCareer,
  updateCareer,
  deleteCareer,
} from '../controllers/admin.career.controller';
import {
  saveCareer,
  unsaveCareer,
  getSavedCareers,
} from '../controllers/savedCareer.controller';
import { authMiddleware, adminMiddleware } from '../middleware/middleware';

const router: Router = Router();

router.get('/search', searchCareers);
router.get('/suggestions', getSuggestions);
router.get('/categories', getCategories);

router.get('/saved', authMiddleware, getSavedCareers);
router.post('/saved', authMiddleware, saveCareer);
router.delete('/saved/:careerId', authMiddleware, unsaveCareer);

router.get('/:id', getCareerById);

// Admin-only career management routes
router.post('/', adminMiddleware, createCareer);
router.put('/:id', adminMiddleware, updateCareer);
router.delete('/:id', adminMiddleware, deleteCareer);

export default router;