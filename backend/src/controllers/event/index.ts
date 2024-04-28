import express from "express";
import { ROLES } from "schema";
import { auth } from "../auth";
import { requireRole } from "../auth/role";
import { createEventController } from "./createEvent";
import { deleteEventController } from "./deleteEventController";
import { getEventController } from "./getEvents";
import { updateEventController } from "./updateEvent";

export const eventRouter = express.Router();

eventRouter
	.route("/")
	.post(auth, requireRole(ROLES.ADMIN), createEventController)
	.get(getEventController);
eventRouter
	.route("/:id")
	.delete(auth, requireRole(ROLES.ADMIN), deleteEventController)
	.put(auth, requireRole(ROLES.ADMIN), updateEventController);
