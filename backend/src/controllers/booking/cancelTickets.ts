import { Response } from "express";
import { prisma } from "../../db/client";
import { ROLES } from "schema";

export const cancelController = async (req: any, res: Response) => {

    try {
        const query = req.user.role.name === ROLES.ADMIN ? {
            id: parseInt(req.params.id)
        } : {
            id: parseInt(req.params.id),
            userId: parseInt(req.user.id)
        }
        const data = await prisma.booking.updateMany({
            where: query,
            data: {
                canceled: true
            }
        })
        res.json({ data, message: 'ticket canceled successfuly' })
    } catch (error) {
        res.status(500).json(error)

    }
}