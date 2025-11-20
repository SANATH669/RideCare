import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createServiceRequest = async (req: any, res: Response) => {
    const { location, vehicleType, description, photos } = req.body;
    const userId = req.user.id;

    try {
        const request = await prisma.serviceRequest.create({
            data: {
                userId,
                location,
                vehicleType,
                description,
                photos: photos ? JSON.stringify(photos) : null, // Store as JSON string for SQLite
                status: 'PENDING',
            },
        });
        res.status(201).json(request);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
export const getServiceRequests = async (req: any, res: Response) => {
    const userId = req.user.id;
    const role = req.user.role;

    try {
        let requests: any[] = [];
        if (role === 'PASSENGER') {
            requests = await prisma.serviceRequest.findMany({ where: { userId } });
        } else if (role === 'MECHANIC') {
            requests = await prisma.serviceRequest.findMany({ where: { mechanicId: userId } });
        } else {
            requests = [];
        }
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getNearbyRequests = async (req: any, res: Response) => {
    if (req.user.role !== 'MECHANIC') {
        return res.status(403).json({ message: 'Access denied' });
    }

    try {
        const requests = await prisma.serviceRequest.findMany({
            where: { status: 'PENDING' },
            include: { user: { select: { name: true, phone: true } } },
        });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateRequestStatus = async (req: any, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    try {
        const request = await prisma.serviceRequest.findUnique({ where: { id } });
        if (!request) return res.status(404).json({ message: 'Request not found' });

        if (status === 'ACCEPTED' && req.user.role === 'MECHANIC') {
            if (request.status !== 'PENDING') {
                return res.status(400).json({ message: 'Request already taken' });
            }
            const updatedRequest = await prisma.serviceRequest.update({
                where: { id },
                data: { status: 'ACCEPTED', mechanicId: userId },
            });
            return res.json(updatedRequest);
        }

        const updatedRequest = await prisma.serviceRequest.update({
            where: { id },
            data: { status },
        });
        res.json(updatedRequest);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
