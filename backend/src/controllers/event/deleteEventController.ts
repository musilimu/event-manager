import { prisma } from "../../db/client";
import { Request, Response } from "express";


export const deleteEventController = async (req: Request, res: Response) => {
    try {

        const data = await prisma.event.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })

        res.status(200).json({ message: `event deleted successfully`, data })
    } catch (error) {
        res.status(500).json(error)
    }
}
