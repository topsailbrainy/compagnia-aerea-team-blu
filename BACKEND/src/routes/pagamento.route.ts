// route di pagamento e dati utente
import { Router } from "express";
import { cardDataGET, userDataGET, userGET, userGETById } from "../controller/user.controller";    
import { authMW } from "@/middleware/authorization.MW";

export const router = Router();

router.get("/payment", authMW, userGETById, userDataGET, cardDataGET);