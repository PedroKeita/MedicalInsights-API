import { describe, it, beforeAll, afterAll, expect, vi } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import prisma from '../../prisma/client.js';
import { GoogleGenAI } from '@google/genai';

// Mock da API Gemini
vi.mock('@google/genai', () => {
  return {
    GoogleGenAI: vi.fn().mockImplementation(() => ({
      models: {
        generateContent: vi.fn().mockResolvedValue({
          text: JSON.stringify({
            notes: 'Paciente com saúde excelente.',
            metrics: { heartRate: 75, bloodPressure: '120/80', temperature: 36.6 },
            recommendations: ['Manter hábitos saudáveis', 'Check-up anual'],
            riskLevel: 'Baixo',
            alert: null
          })
        })
      }
    }))
  };
});

describe('POST /analysis', () => {
  beforeAll(async () => {
    await prisma.analysis.deleteMany({});
    await prisma.vitals.deleteMany({});
    await prisma.patient.deleteMany({});
    
    await prisma.patient.create({
      data: {
        id: 1,
        name: 'Teste Paciente',
        age: 30,
        gender: 'M',
        medicalHistory: 'Nenhum'
      }
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('Deve criar uma análise preditiva com dados válidos', async () => {
    const response = await request(app)
      .post('/api/analysis')
      .send({
        patientId: 1,
        age: 30,
        gender: 'M',
        medicalHistory: 'Nenhum',
        vitals: { heartRate: 75, bloodPressure: '120/80', temperature: 36.6 },
        createdBy: 'dr.teste'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('insights');
    expect(response.body.insights).toHaveProperty('notes');
    expect(response.body.insights).toHaveProperty('metrics');
    expect(response.body.insights).toHaveProperty('recommendations');
    expect(response.body.riskLevel).toBe('Baixo');
    expect(response.body.alert).toBeNull();
    expect(response.body.createdBy).toBe('dr.teste');
  });

  it('Deve retornar 400 se campos obrigatórios estiverem faltando', async () => {
    const response = await request(app)
      .post('/api/analysis')
      .send({
        age: 30,
        gender: 'M'
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('Deve retornar 404 se paciente não existir', async () => {
    const response = await request(app)
      .post('/api/analysis')
      .send({
        patientId: 999,
        age: 40,
        gender: 'F',
        medicalHistory: '',
        createdBy: 'dr.teste'
      });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });
});
