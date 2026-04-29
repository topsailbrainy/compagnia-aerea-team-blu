import { Router } from "express";
import { profileGET } from "../controller/profile.controller";
import { bookingPOST } from "../controller/booking.controller";

export const router = Router();

router.get("/profile", profileGET);
router.post("/prenotazione", bookingPOST);
router.get("/prenotazione", (req, res) => res.status(405).json({ error: "Usa POST per creare una prenotazione" }));


