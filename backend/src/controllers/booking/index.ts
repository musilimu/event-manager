import express from "express";
import { auth } from "../auth";
import { bookEventController } from "./booking";
import { getBookingEventController } from "./getBooking";

export const bookingRouter = express.Router();

bookingRouter.route('/')
    .post(auth, bookEventController).get(auth, getBookingEventController)
// .get(getEventController)
// eventRouter.route('/:id')
//     .delete(auth, requireRole(ROLES.ADMIN), deleteEventController)