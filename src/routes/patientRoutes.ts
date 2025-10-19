import { Router } from 'express';
import  { createPatient, listPatient, getPatientById, updatePatient, deletePatient }  from '../controllers/patientController.js';

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

/**
 * @swagger
 * /patients/{id}:
 *   put:
 *     summary: Atualiza os dados de um paciente existente
 *     description: Permite atualizar as informações de um paciente pelo ID. Todos os campos obrigatórios devem estar presentes.
 *     tags:
 *       - Pacientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do paciente a ser atualizado
 *         schema:
 *           type: integer
 *           example: 1
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
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Pedro Farias"
 *                 age:
 *                   type: integer
 *                   example: 30
 *                 gender:
 *                   type: string
 *                   example: "M"
 *                 medicalHistory:
 *                   type: string
 *                   example: "Histórico de alergias leves"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-10-19T12:00:00Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-10-19T12:30:00Z"
 *       400:
 *         description: Campos obrigatórios faltando ou inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Campos obrigatórios faltando"
 *       404:
 *         description: Paciente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Paciente não encontrado"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao atualizar paciente"
 */
router.put('/patients/:id', updatePatient);

router.delete('/patients/:id', deletePatient);

export default router;