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

export const listPatient = async (req: Request, res: Response) => {
    try {
        const patients = await prisma.patient.findMany({
            select: {
                id: true,
                name: true,
                age: true,
                gender: true,
            }
        });

        return res.status(200).json(patients);

    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Erro ao listar pacientes'});
    }
}

export const getPatientById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'ID do paciente não fornecido' });
        }

        const patient = await prisma.patient.findUnique({
            where: { id: Number(id) },
            select: {
                id: true,
                name: true,
                age: true,
                gender: true,
                medicalHistory: true
            }
        });

        if (!patient) {
            return res.status(404).json({ message: 'Paciente não encontrado' });
        }

        return res.status(200).json(patient);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar o paciente' });
    }
}

export const updatePatient = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const { name, age, gender, medicalHistory, updatedBy } = req.body;

        const existingPatient = await prisma.patient.findUnique({
            where: { id: Number(id)},
        });

        if (!existingPatient) {
            return res.status(404).json({ message: 'Paciente não encontrado' });
        }

        if (!name || !age || !gender) {
            return res.status(400).json({ message: 'Campos obrigatórios não podem ser nulos' });
        }

        const updatedPatient = await prisma.patient.update({
            where: { id: Number(id) },
            data: {
                name,
                age,
                gender,
                medicalHistory,
                updatedAt: new Date(),
                updatedBy: updatedBy || 'System',
            },
        });

        return res.status(200).json(updatedPatient);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao atualizar paciente' });
    }
};

export const deletePatient = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const existingPatient = await prisma.patient.findUnique({
            where: { id: Number(id) },
        });

        if (!existingPatient) {
            return res.status(404).json({ message: 'Paciente não encontrado' });
        }

        await prisma.patient.delete({
            where: { id: Number(id) },
        });

        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao remover o paciente'});
    }
}
