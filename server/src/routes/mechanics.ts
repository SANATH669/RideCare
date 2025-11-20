import express from 'express';
import { createServiceRequest, getServiceRequests, getNearbyRequests, updateRequestStatus } from '../controllers/mechanicController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticateToken, createServiceRequest);
router.get('/', authenticateToken, getServiceRequests);
router.get('/nearby', authenticateToken, getNearbyRequests);
router.patch('/:id/status', authenticateToken, updateRequestStatus);

export default router;
