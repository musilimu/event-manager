import express from "express";
import { createEventController } from "./createEvent";
import { requireRole } from "../auth/role";
import { ROLES } from "schema";
import { getEventController } from "./getEvents";
import { auth } from "../auth";
import { deleteEventController } from "./deleteEventController";

export const eventRouter = express.Router();

eventRouter.route('/event')
    .post(auth, requireRole(ROLES.ADMIN), createEventController)
    .get(getEventController)
eventRouter.route('/event/:id')
    .delete(auth, requireRole(ROLES.ADMIN), deleteEventController)