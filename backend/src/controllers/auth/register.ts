import express from "express";
import { User } from "schema";
import { prisma } from "../../db/client";
import bcrypt from "bcrypt";

const SALTROUND = 10;

export const registerRouter = express.Router();
registerRouter.post("/", async (req, res) => {
	try {
		const { data, error } = User.safeParse(req.body)
		if (error) {
			res.status(400).json(error)
			return
		}
		
		const salt = bcrypt.genSaltSync(SALTROUND);
		const passwordHash = bcrypt.hashSync(data.password, salt);
		const user = await prisma.user.create({
			data: {
				email: data.email,
				password: passwordHash,
			}
		})
		res.status(200).json({message: `account ${user.email} created successfully`})
	} catch (error) {
		res.status(500).json(error)
	}
});
