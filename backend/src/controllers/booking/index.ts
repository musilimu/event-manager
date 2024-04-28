import express from "express";
import { auth } from "../auth";
import { bookEventController } from "./booking";
import { cancelController } from "./cancelTickets";
import { getBookingEventController } from "./getBooking";

export const bookingRouter = express.Router();

bookingRouter
	.route("/")
	.post(auth, bookEventController)
	.get(auth, getBookingEventController);
bookingRouter.route("/:id").delete(auth, cancelController);
