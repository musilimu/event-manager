import type { Response } from "express";
import { prisma } from "../../db/client";

export const getEventController = async (_: any, res: Response) => {
	try {
		const data = await prisma.event.findMany();
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json(error);
	}
};
