import { Response } from "express";
import { prisma } from "../../db/client";
import { z } from "zod";

const idSchema = z.object({
    ids: z.number().array().min(1)
})
export const bookEventController = (req: any, res: Response) => {
    try {
        const { error, data } = idSchema.safeParse({ ids: req.body })
        if (error) {
            res.status(400).json(error)
            return
        }
        data.ids.forEach(async (id) => {
            await prisma.booking.create({
                data: {
                    eventId: id,
                    userId: req.user.id
                }
            })
        })

        res.json({ data, message: 'successfuly booked' })
    } catch (error) {
        res.status(500).json(error)

    }

}