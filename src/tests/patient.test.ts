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

describe('GET /patients', () => {
  let patientId: number;

  beforeAll(async () => {
    // Limpa a tabela e cria um paciente para teste
    await prisma.patient.deleteMany({});
    const patient = await prisma.patient.create({
      data: {
        name: 'Maria Silva',
        age: 30,
        gender: 'F',
        medicalHistory: 'Diabetes',
      },
    });
    patientId = patient.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('Deve listar todos os pacientes', async () => {
    const response = await request(app).get('/api/patients');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('age');
    expect(response.body[0]).toHaveProperty('gender');
  });

  it('Deve buscar paciente por ID', async () => {
    const response = await request(app).get(`/api/patients/${patientId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', patientId);
    expect(response.body).toHaveProperty('name', 'Maria Silva');
    expect(response.body).toHaveProperty('age', 30);
    expect(response.body).toHaveProperty('gender', 'F');
  });

  it('Deve retornar 404 se paciente não existir', async () => {
    const response = await request(app).get('/api/patients/999999');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });
});
