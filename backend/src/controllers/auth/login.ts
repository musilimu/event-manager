import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { User } from "schema";
import { prisma } from "../../db/client";

export const loginRouter = express.Router();
loginRouter.post("/", async (req, res) => {
	try {
		const { data, error } = User.safeParse(req.body);
		if (error) {
			res.status(400).json(error);
			return;
		}

		const user = await prisma.user.findFirst({
			where: { email: data.email },
		});
		if (!user) {
			res
				.status(400)
				.json({ message: `account for ${data.email} was not found!` });
			return;
		}

		const result = await bcrypt.compare(data.password, user.password);
		if (!result) {
			res
				.status(400)
				.json({ message: `You may have forgot your email or password` });
			return;
		}

		const token = jwt.sign(user.email, process.env.SECRET!);
		res.status(200).json({ token });
	} catch (error) {
		res.status(500).json(error);
	}
});
