import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAvailableDrivers = async (req: any, res: Response) => {
    const { location } = req.query;

    try {
        const drivers = await prisma.user.findMany({
            where: {
                role: 'DRIVER',
                driverProfile: {
                    isAvailable: true,
                    ...(location ? {
                        currentLocation: {
                            contains: location as string,
                        }
                    } : {})
                },
            },
            select: {
                id: true,
                name: true,
                phone: true,
                driverProfile: {
                    select: {
                        vehicleDetails: true,
                        licenseNumber: true,
                        currentLocation: true,
                        isAvailable: true,
                    },
                },
            },
        });

        res.json(drivers);
    } catch (error) {
        console.error('Error fetching available drivers:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
