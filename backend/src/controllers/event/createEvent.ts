import express from "express";
import { Event, ROLES } from "schema";
import { prisma } from "../../db/client";
import { auth } from "../auth";
import { requireRole } from "../auth/role";


export const createEventRouter = express.Router();
createEventRouter.post("/event", auth, requireRole(ROLES.ADMIN), async (req, res) => {
	try {
		const { data, error } = Event.safeParse(req.body)

		if (error) {
			res.status(400).json(error)
			return
		}

		const event = await prisma.event.create({
			data
		})

		res.status(200).json({ message: `event created successfully`, data: event })
	} catch (error) {
		res.status(500).json(error)
	}
});
