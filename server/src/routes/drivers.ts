import express from 'express';
import { getAvailableDrivers } from '../controllers/driverController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/available', authenticateToken, getAvailableDrivers);

export default router;
