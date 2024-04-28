import type { Request, Response } from "express";
import { Event } from "schema";
import { prisma } from "../../db/client";

export const updateEventController = async (req: Request, res: Response) => {
	try {
		const { data, error } = Event.safeParse(req.body);

		if (error) {
			res.status(400).json(error);
			return;
		}

		const event = await prisma.event.update({
			where: {
				id: Number.parseInt(req.params.id),
			},
			data,
		});

		res
			.status(200)
			.json({ message: `event updated successfully`, data: event });
	} catch (error) {
		res.status(500).json(error);
	}
};
