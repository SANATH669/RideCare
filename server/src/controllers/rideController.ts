import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createRide = async (req: any, res: Response) => {
    const { pickup, dropoff, type, scheduledTime, price, driverId } = req.body;
    const passengerId = req.user.id;

    try {
        const ride = await prisma.ride.create({
            data: {
                passengerId,
                driverId: driverId || null,
                pickup,
                dropoff,
                type,
                scheduledTime: scheduledTime ? new Date(scheduledTime) : null,
                price: price || 0,
                status: driverId ? 'ACCEPTED' : 'PENDING',
            },
        });
        res.status(201).json(ride);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
export const getRides = async (req: any, res: Response) => {
    const userId = req.user.id;
    const role = req.user.role;

    try {
        let rides: any[] = [];
        if (role === 'PASSENGER') {
            rides = await prisma.ride.findMany({ where: { passengerId: userId } });
        } else if (role === 'DRIVER') {
            rides = await prisma.ride.findMany({ where: { driverId: userId } });
        } else {
            rides = [];
        }
        res.json(rides);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getAvailableRides = async (req: any, res: Response) => {
    if (req.user.role !== 'DRIVER') {
        return res.status(403).json({ message: 'Access denied' });
    }

    try {
        const rides = await prisma.ride.findMany({
            where: { status: 'PENDING' },
            include: { passenger: { select: { name: true, phone: true } } },
        });
        res.json(rides);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateRideStatus = async (req: any, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    try {
        const ride = await prisma.ride.findUnique({ where: { id } });
        if (!ride) return res.status(404).json({ message: 'Ride not found' });

        // Logic for accepting a ride
        if (status === 'ACCEPTED' && req.user.role === 'DRIVER') {
            if (ride.status !== 'PENDING') {
                return res.status(400).json({ message: 'Ride already taken' });
            }
            const updatedRide = await prisma.ride.update({
                where: { id },
                data: { status: 'ACCEPTED', driverId: userId },
            });
            return res.json(updatedRide);
        }

        // Logic for other status updates
        const updatedRide = await prisma.ride.update({
            where: { id },
            data: { status },
        });
        res.json(updatedRide);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
