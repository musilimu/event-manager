import express from "express";
import { ROLES } from "schema";
// import { prisma } from "../../db/client";
// import bcrypt from "bcrypt";
import { auth } from "../auth";
import { requireRole } from "../auth/role";

// const SALTROUND = 10;

export const createEventRouter = express.Router();
createEventRouter.post("/event", auth, requireRole(ROLES.ADMIN), async (_, res) => {
	try {
		// const { data, error } = User.safeParse(req.body)
		// if (error) {
		// 	res.status(400).json(error)
		// 	return
		// }

		// const salt = bcrypt.genSaltSync(SALTROUND);
		// const passwordHash = bcrypt.hashSync(data.password, salt);
		// const user = await prisma.user.create({
		// 	data: {
		// 		email: data.email,
		// 		password: passwordHash,
		// 	}
		// })
		res.status(200).json({ message: `account created successfully` })
	} catch (error) {
		res.status(500).json(error)
	}
});
