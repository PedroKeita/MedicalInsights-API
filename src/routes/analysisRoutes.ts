import { Router } from 'express';
import { createAnalysis } from '../controllers/analysisController.js';

const router = Router();

router.post('/analysis', createAnalysis);

export default router;