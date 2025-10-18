import { Router } from 'express';
import  { createPatient }  from '../controllers/patientController.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: Endpoints para gerenciamento de pacientes
 */

/**
 * @swagger
 * /patients:
 *   post:
 *     summary: Adiciona um novo paciente
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - age
 *               - gender
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Edson Farias"
 *               age:
 *                 type: number
 *                 example: 34
 *               gender:
 *                 type: string
 *                 example: "Masculino"
 *               medicalHistory:
 *                 type: string
 *                 example: "Nenhum"
 *     responses:
 *       201:
 *         description: Paciente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 name:
 *                   type: string
 *                 age:
 *                   type: number
 *                 gender:
 *                   type: string
 *       400:
 *         description: Falta de campos obrigatórios
 */
router.post('/patients', createPatient);

export default router;