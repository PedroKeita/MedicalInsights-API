import { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import prisma from '../../prisma/client.js';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error('A chave de API GEMINI_API_KEY não foi definida nas variáveis de ambiente.');
}

const client = new GoogleGenAI({ apiKey });

export const createAnalysis = async (req: Request, res: Response) => {
    try {
        const { patientId, age, gender, medicalHistory, vitals, createdBy } = req.body;

        if (!patientId || !age || !gender || !createdBy) {
            return res.status(400).json({ message: 'Campos obrigatórios faltando' });
        }

        const patient = await prisma.patient.findUnique({ where: { id: patientId }});
        if (!patient) {
            return res.status(404).json({ message: 'Paciente não encontrado' });
        }

        const prompt = `
        Dados do paciente:
        Idade: ${age}
        Gênero: ${gender}
        Histórico Médico: ${medicalHistory}
        Sinais Vitais: ${JSON.stringify(vitals)}

        Forneça uma análise preditiva em JSON, com os seguintes campos:
                - notes: resumo textual da análise
                - metrics: objeto com métricas relevantes (heartRate, bloodPressure, temperature, etc.)
                - recommendations: array de recomendações médicas
                - riskLevel: nível de risco (Baixo, Médio, Alto)
                - alert: string ou null
                `;

       
        const aiResponse = await client.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const aiMessage: string = aiResponse.text ?? '';
        let aiData;

        try {
            const cleanMessage = aiMessage.replace(/```json|```/g, '').trim();
            aiData = JSON.parse(cleanMessage);
        } catch (err) {
            console.error("Falha ao parsear resposta da IA:", aiMessage);
            aiData = {
                notes: aiMessage,
                metrics: {},
                recommendations: [],
                riskLevel: 'unknown',
                alert: null
            };
        }

        const analysis = await prisma.analysis.create({
            data: {
                patientId,
                insights: {
                    notes: aiData.notes ?? aiMessage,
                    metrics: aiData.metrics ?? {},
                    recommendations: aiData.recommendations ?? []
                },
                riskLevel: aiData.riskLevel ?? null,
                alert: aiData.alert ?? null,
                createdBy
            }
        });

        return res.status(201).json(analysis);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao criar análise', error });
    }
};

export const getPatientAnalyses = async (req: Request, res: Response) => {
    const patientId = Number(req.params.id);

    try {
        const patient = await prisma.patient.findUnique({
            where: { id: patientId},
        });

        if (!patient) {
            return res.status(404).json({ message: 'Paciente não encontrado'});
        }

        const analyses = await prisma.analysis.findMany({
            where: { patientId },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                insights: true,
                riskLevel: true,
                alert: true,
                createdAt: true,
                createdBy: true,
            }
        });

        return res.status(200).json(analyses);
    } catch (error) {
        console.error('Erro ao buscar análises:', error);
        return res.status(500).json({ message: 'Erro ao buscar análises', error});
    }
};
