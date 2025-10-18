import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import prisma from '../../prisma/client.js';

describe('POST /patients', () => {
  beforeAll(async () => {
    // Limpa a tabela antes dos testes
    await prisma.patient.deleteMany({});
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('Deve criar um paciente com dados válidos', async () => {
    const response = await request(app)
      .post('/api/patients')
      .send({
        name: 'Pedro Farias',
        age: 25,
        gender: 'M',
        medicalHistory: 'Nenhum',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Pedro Farias');
    expect(response.body.age).toBe(25);
    expect(response.body.gender).toBe('M');
    expect(response.body).toHaveProperty('medicalHistory'); 
  });

  it('Deve retornar erro 400 se faltar campo obrigatório', async () => {
    const response = await request(app)
      .post('/api/patients')
      .send({
        age: 25,
        gender: 'Masculino',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });
});
