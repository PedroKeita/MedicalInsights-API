import { Router } from 'express';
import  { createPatient, listPatient, getPatientById, updatePatient }  from '../controllers/patientController.js';

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

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Lista todos os pacientes
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: Lista de pacientes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Pedro Farias
 *                   age:
 *                     type: integer
 *                     example: 25
 *                   gender:
 *                     type: string
 *                     example: M
 */
router.get('/patients', listPatient);

/**
 * @swagger
 * /patients/{id}:
 *   get:
 *     summary: Retorna um paciente específico pelo ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do paciente
 *     responses:
 *       200:
 *         description: Paciente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Pedro Farias
 *                 age:
 *                   type: integer
 *                   example: 25
 *                 gender:
 *                   type: string
 *                   example: M
 *                 medicalHistory:
 *                   type: string
 *                   example: Nenhum
 *       404:
 *         description: Paciente não encontrado
 */
router.get('/patients/:id', getPatientById);

router.put('/patients/:id', updatePatient);

export default router;