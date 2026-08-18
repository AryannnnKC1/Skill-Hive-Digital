import { Router } from 'express'
import {
  getResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
} from '../controllers/resource.controller'
import { adminMiddleware } from '../middleware/middleware'

const router = Router()

router.get('/', getResources)
router.get('/:id', getResourceById)

// Admin-only routes
router.post('/', adminMiddleware, createResource)
router.put('/:id', adminMiddleware, updateResource)
router.delete('/:id', adminMiddleware, deleteResource)

export default router