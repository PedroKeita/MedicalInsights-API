import { Router } from 'express';
import  { createPatient }  from '../controllers/patientController.js';

const router = Router();

router.post('/patients', createPatient);

export default router;