import { Response } from "express";
import { prisma } from "../../db/client";

export const cancelController = async (req: any, res: Response) => {

    try {

        const data = await prisma.booking.updateMany({
            where: {
                id: parseInt(req.params.id),
                userId: parseInt(req.user.id)
            },
            data: {
                canceled: true
            }
        })
        res.json({ data, message: 'ticket canceled successfuly' })
    } catch (error) {
        res.status(500).json(error)

    }
}