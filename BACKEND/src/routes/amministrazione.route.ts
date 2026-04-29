import { Router } from "express";
import { aereiDelete, aereiGet, aereiGetById, aereiPost } from "../controller/aerei.controller";
import { aereoportoDELETE, aereoportoGET, aereoportoPOST, aereoportoUPDATE } from "../controller/aereoporti.controller";
import { bookingGET, bookingGETbyId, bookingPOST, bookingDELETE, bookingUPDATE } from "../controller/booking.controller";
import { pilotiGET, pilotiGETById, pilotiPOST, pilotiDELETE, pilotiUPDATE } from "../controller/piloti.controller";
import { prezzoUpdate, trattaDelete, trattaGet, trattaPost } from "../controller/search.controller";
import * as voliAdminController from "../controller/voli.admin.controller";
import { cardDataForAdmin, documentDataforAdmin, userDELETE, userGET, userGETById, userPOST, userUPDATE } from "../controller/user.controller";
import { ticketDELETE, ticketGET, ticketGETbyId, ticketPOST, ticketUPDATE } from "../controller/ticket.controller";
import { adminMW } from "../middleware/admin.MW";
import { authMW } from "../middleware/authorization.MW";

export const router = Router();

//gestione prenotazioni
router.get("/booking", authMW, adminMW, bookingGET);
router.get("/booking/:id", authMW, adminMW, bookingGETbyId);
router.post("/booking", authMW, adminMW, bookingPOST);
router.patch("/booking/:id", authMW, adminMW, bookingUPDATE);
router.delete("/booking/:id", authMW, adminMW, bookingDELETE);

//gestione tratte
router.get("/tratte", authMW, adminMW, trattaGet);
router.post("/tratte", authMW, adminMW, trattaPost);
router.delete("/tratte/:id", authMW, adminMW, trattaDelete);
router.patch("/tratte/:id", authMW, adminMW, prezzoUpdate);

//gestione voli
router.get("/voli", authMW, adminMW, voliAdminController.voliGet);
router.post("/voli", authMW, adminMW, voliAdminController.voliPost);
router.delete("/voli/:id", authMW, adminMW, voliAdminController.voliDelete);
router.patch("/voli/:id", authMW, adminMW, voliAdminController.voliUpdate);

//gestione aeroporti
router.get("/aeroporti", authMW, adminMW, aereoportoGET);
router.post("/aeroporti", authMW, adminMW, aereoportoPOST);
router.delete("/aeroporti/:id", authMW, adminMW, aereoportoDELETE);
router.patch("/aeroporti/:id", authMW, adminMW, aereoportoUPDATE);

//gestione utenti
router.get("/user", authMW, adminMW, userGET);
router.get("/user/:id", authMW, adminMW, userGETById);
router.delete("/user/:id", authMW, adminMW, userDELETE);
router.post("/user", authMW, adminMW, userPOST);
router.patch("/user/:id", authMW, adminMW, userUPDATE);
router.get("/user/pagamenti", authMW, adminMW, cardDataForAdmin);
router.get("/user/documenti", authMW, adminMW, documentDataforAdmin);

//gestione aerei
router.get("/aerei", authMW, adminMW, aereiGet);
router.get("/aerei/:id", authMW, adminMW, aereiGetById);
router.post("/aerei", authMW, adminMW, aereiPost);
router.delete("/aerei/:id", authMW, adminMW, aereiDelete);

//gestione piloti
router.get("/piloti", authMW, adminMW, pilotiGET);
router.get("/piloti/:id", authMW, adminMW, pilotiGETById);
router.post("/piloti", authMW, adminMW, pilotiPOST);
router.delete("/piloti/:id", authMW, adminMW, pilotiDELETE);
router.patch("/piloti/:id", authMW, adminMW, pilotiUPDATE);

//gestione biglietti
router.get("/ticket", authMW, adminMW, ticketGET);
router.get("/ticket/:id", authMW, adminMW, ticketGETbyId);
router.post("/ticket", authMW, adminMW, ticketPOST);
router.delete("/ticket/:id", authMW, adminMW, ticketDELETE);
router.patch("/ticket/:id", authMW, adminMW, ticketUPDATE);
