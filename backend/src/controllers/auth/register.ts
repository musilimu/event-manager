import express from "express";
import { User } from "schema";

export const router = express.Router();
router.post("/register", (req, res) => {
	const {data, error} = User.safeParse(req.body)
	if(error) {
		res.status(400).json(error)
		return
	}
	res.json(data)
});
