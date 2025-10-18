import {Request, Response} from 'express';
import prisma from '../../prisma/client.js';

export const createPatient = async (req: Request, res: Response) => {
    try {
        const { name, age, gender, medicalHistory } = req.body;

        if (!name || !age || ! gender) {
            return res.status(400).json({ message: 'Campos obrigatórios faltando'});
        }

        const patient = await prisma.patient.create({
            data: {
                name,
                age,
                gender,
                medicalHistory
            },
        });

        return res.status(201).json(patient);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao criar o paciente'});
    }
}

