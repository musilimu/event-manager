import { Response } from "express";
import { prisma } from "../../db/client";
import { ROLES } from "schema";

export const getBookingEventController = async (req: any, res: Response) => {
    const condtion = req.user.role.name === ROLES.ADMIN ? {} : {
        userId: req.user.id,
        canceled: false
    }

    try {

        const data = await prisma.booking.findMany({
            where: condtion,
            include: {
                event: true,
                user: true
            }
        })

        res.json({ data, message: 'successfuly booked' })
    } catch (error) {
        res.status(500).json(error)

    }
}