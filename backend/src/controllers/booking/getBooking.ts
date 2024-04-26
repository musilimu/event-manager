import { Response } from "express";
import { prisma } from "../../db/client";

export const getBookingEventController = async (req: any, res: Response) => {

    try {

        const data = await prisma.booking.findMany({
            where: {
                userId: req.user.id,
                canceled: false
            },
            include: {
                event: true
            }
        })

        res.json({ data, message: 'successfuly booked' })
    } catch (error) {
        res.status(500).json(error)

    }
}