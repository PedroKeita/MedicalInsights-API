import { Router } from 'express';
import { createAnalysis, getPatientAnalyses } from '../controllers/analysisController.js';

const router = Router();

/**
 * @swagger
 * /analysis:
 *   post:
 *     summary: Cria uma análise preditiva de paciente
 *     tags: [Analysis]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - patientId
 *               - age
 *               - gender
 *               - createdBy
 *             properties:
 *               patientId:
 *                 type: integer
 *                 example: 32
 *               age:
 *                 type: integer
 *                 example: 34
 *               gender:
 *                 type: string
 *                 example: "Masculino"
 *               medicalHistory:
 *                 type: string
 *                 example: "Nenhum histórico relevante"
 *               vitals:
 *                 type: object
 *                 properties:
 *                   heartRate:
 *                     type: integer
 *                     example: 75
 *                   bloodPressure:
 *                     type: string
 *                     example: "120/80"
 *                   temperature:
 *                     type: number
 *                     format: float
 *                     example: 36.6
 *                   oxygenSaturation:
 *                     type: number
 *                     format: float
 *                     example: 98
 *               createdBy:
 *                 type: string
 *                 example: "dr.edson.farias"
 *     responses:
 *       201:
 *         description: Análise criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Analysis'
 *       400:
 *         description: Campos obrigatórios faltando
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
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 */
router.post('/analysis', createAnalysis);

/**
 * @swagger
 * /patients/{id}/analyses:
 *   get:
 *     tags:
 *       - Analysis
 *     summary: Retorna o histórico de análises de um paciente
 *     description: Retorna todas as análises realizadas para o paciente especificado, ordenadas por data de criação (mais recentes primeiro).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do paciente
 *     responses:
 *       200:
 *         description: Lista de análises retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   insights:
 *                     type: object
 *                   riskLevel:
 *                     type: string
 *                   alert:
 *                     type: string
 *                     nullable: true
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   createdBy:
 *                     type: string
 *       404:
 *         description: Paciente não encontrado
 */
router.get('/patients/:id/analyses', getPatientAnalyses);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Patient:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Pedro Farias"
 *         age:
 *           type: integer
 *           example: 30
 *         gender:
 *           type: string
 *           example: "M"
 *         medicalHistory:
 *           type: string
 *           example: "Nenhum"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-10-19T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-10-19T12:30:00Z"
 *     Analysis:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         patientId:
 *           type: integer
 *           example: 32
 *         insights:
 *           type: object
 *           properties:
 *             notes:
 *               type: string
 *               example: "Paciente com saúde excelente."
 *             metrics:
 *               type: object
 *               properties:
 *                 heartRate:
 *                   type: integer
 *                   example: 75
 *                 bloodPressure:
 *                   type: string
 *                   example: "120/80"
 *                 temperature:
 *                   type: number
 *                   format: float
 *                   example: 36.6
 *                 oxygenSaturation:
 *                   type: number
 *                   format: float
 *                   example: 98
 *             recommendations:
 *               type: array
 *               items:
 *                 type: string
 *               example: ["Manter hábitos saudáveis", "Check-up anual"]
 *         riskLevel:
 *           type: string
 *           example: "Baixo"
 *         alert:
 *           type: string
 *           nullable: true
 *           example: null
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-10-19T15:16:48.868Z"
 *         createdBy:
 *           type: string
 *           example: "dr.edson.farias"
 *     ErrorMessage:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Erro ao processar requisição"
 */