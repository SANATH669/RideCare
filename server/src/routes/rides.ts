import express from 'express';
import { createRide, getRides, getAvailableRides, updateRideStatus } from '../controllers/rideController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticateToken, createRide);
router.get('/', authenticateToken, getRides);
router.get('/available', authenticateToken, getAvailableRides);
router.patch('/:id/status', authenticateToken, updateRideStatus);

export default router;
