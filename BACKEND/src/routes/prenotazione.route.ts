//prenotazione id
import { Router } from "express";
import { bookingGETbyId } from "../controller/booking.controller";

export const router = Router();

router.get("/booking/:id", bookingGETbyId);