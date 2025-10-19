import { Router } from 'express';
import  { createPatient, listPatient, getPatientById, updatePatient, deletePatient }  from '../controllers/patientController.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Patients
 *     description: Endpoints para gerenciamento de pacientes
 *   - name: Analysis
 *     description: Endpoints para análises preditivas de pacientes
 */

/**
 * @swagger
 * /patients:
 *   post:
 *     summary: Adiciona um novo paciente
 *     tags: [Patients]
 *     requestBody:
 *       description: Dados do paciente
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
 *                 type: integer
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
 *               $ref: '#/components/schemas/Patient'
 *       400:
 *         description: Falta de campos obrigatórios
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
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
 *                 $ref: '#/components/schemas/Patient'
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
 *               $ref: '#/components/schemas/Patient'
 *       404:
 *         description: Paciente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 */
router.get('/patients/:id', getPatientById);

/**
 * @swagger
 * /patients/{id}:
 *   put:
 *     summary: Atualiza um paciente existente
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do paciente a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Pedro Farias"
 *               age:
 *                 type: integer
 *                 example: 30
 *               gender:
 *                 type: string
 *                 example: "M"
 *               medicalHistory:
 *                 type: string
 *                 example: "Histórico de alergias leves"
 *     responses:
 *       200:
 *         description: Paciente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       400:
 *         description: Campos obrigatórios faltando ou inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 *       404:
 *         description: Paciente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 */
router.put('/patients/:id', updatePatient);

/**
 * @swagger
 * /patients/{id}:
 *   delete:
 *     summary: Remove um paciente pelo ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do paciente a ser removido
 *     responses:
 *       204:
 *         description: Paciente removido com sucesso
 *       404:
 *         description: Paciente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 */
router.delete('/patients/:id', deletePatient);

export default router;