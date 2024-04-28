import type { Response } from "express";
import { ROLES } from "schema";
import { prisma } from "../../db/client";

export const cancelController = async (req: any, res: Response) => {
	try {
		const query =
			req.user.role.name === ROLES.ADMIN
				? {
						id: Number.parseInt(req.params.id),
					}
				: {
						id: Number.parseInt(req.params.id),
						userId: Number.parseInt(req.user.id),
					};
		const data = await prisma.booking.updateMany({
			where: query,
			data: {
				canceled: true,
			},
		});
		res.json({ data, message: "ticket canceled successfuly" });
	} catch (error) {
		res.status(500).json(error);
	}
};
