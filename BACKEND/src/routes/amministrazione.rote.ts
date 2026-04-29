import { aereiDelete, aereiGet, aereiGetById, aereiPost } from "@/controller/aerei.controller";
import { aereoportoDELETE, aereoportoGET, aereoportoPOST, aereoportoUPDATE } from "@/controller/aereoporti.controller";
import { bookingGET, bookingGETbyId, bookingPOST, bookingDELETE, bookingUPDATE } from "@/controller/booking.controller";
import { pilotiGET, pilotiGETById, pilotiPOST, pilotiDELETE, pilotiUPDATE } from "@/controller/piloti.controller";
import { prezzoUpdate, trattaDelete, trattaGet, trattaPost } from "@/controller/search.controller";
import { cardDataForAdmin, documentDataforAdmin, userDELETE, userGET, userGETById, userPOST, userUPDATE } from "@/controller/user.controller";
import { ticketDELETE, ticketGET, ticketGETbyId, ticketPOST, ticketUPDATE } from "@/controller/ticket.controller";
import { adminMW } from "@/middleware/admin.MW";
import { authMW } from "@/middleware/authorization.MW";
import { Router } from "express";


export const router = Router();

//gestione prenotazioni
router.get("/amministrazione/booking", authMW, adminMW, bookingGET);
router.get("/amministrazione/booking/:id", authMW, adminMW, bookingGETbyId);
router.post("/amministrazione/booking", authMW, adminMW, bookingPOST);
router.patch("/amministrazione/booking/:id", authMW, adminMW, bookingUPDATE);
router.delete("/amministrazione/booking/:id", authMW, adminMW, bookingDELETE);
//gestione tratte
router.get("/amministrazione/tratte", authMW, adminMW, trattaGet);
router.post("/amministrazione/tratte", authMW, adminMW, trattaPost);
router.delete("/amministrazione/tratte/:id", authMW, adminMW, trattaDelete);
router.patch("/amministrazione/tratte/:id", authMW, adminMW, prezzoUpdate);
//gestione voli
router.get("/amministrazione/aeroporti", authMW, adminMW, aereoportoGET);
router.post("/amministrazione/aeroporti", authMW, adminMW, aereoportoPOST);
router.delete("/amministrazione/aeroporti/:id", authMW, adminMW, aereoportoDELETE);
router.patch("/amministrazione/aeroporti/:id", authMW, adminMW, aereoportoUPDATE);
//gestione utenti
router.get("/amministrazione/user", authMW, adminMW, userGET);
router.get("/amministrazione/user/:id", authMW, adminMW, userGETById);
router.delete("/amministrazione/user/:id", authMW, adminMW, userDELETE);
router.post("/amministrazione/user", authMW, adminMW, userPOST);
router.patch("/amministrazione/user/:id", authMW, adminMW, userUPDATE);
router.get("/amministrazione/user/pagamenti", authMW, adminMW, cardDataForAdmin);
router.get("/amministrazione/user/documenti", authMW, adminMW, documentDataforAdmin);
//gestione aerei
router.get("/amministrazione/aerei", authMW, adminMW, aereiGet);
router.get("/amministrazione/aerei/:id", authMW, adminMW, aereiGetById);
router.post("/amministrazione/aerei", authMW, adminMW, aereiPost);
router.delete("/amministrazione/aerei/:id", authMW, adminMW, aereiDelete);
//gestione piloti
router.get("/amministrazione/piloti", authMW, adminMW, pilotiGET);
router.get("/amministrazione/piloti:id", authMW, adminMW, pilotiGETById);
router.post("/amministrazione/piloti", authMW, adminMW, pilotiPOST);
router.delete("/amministrazione/piloti:id", authMW, adminMW, pilotiDELETE);
router.patch("/amministrazione/piloti:id", authMW, adminMW, pilotiUPDATE);
//gestione biglietti
router.get("/amministrazione/ticket", authMW, adminMW, ticketGET);
router.get("/amministrazione/ticket/:id", authMW, adminMW, ticketGETbyId);
router.post("/amministrazione/ticket", authMW, adminMW, ticketPOST);
router.delete("/amministrazione/ticket/:id", authMW, adminMW, ticketDELETE);
router.patch("/amministrazione/ticket/:id", authMW, adminMW, ticketUPDATE);
//gestione pagamenti



