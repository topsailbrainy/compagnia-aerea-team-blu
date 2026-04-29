//GHOAN AIRLINES HOME
import { Router } from "express";
import { partenzaGET } from "../controller/aereoporti.controller";


export const router = Router();
// barra di ricerca che restituisce areoporti partenza e arrivo
router.get("/search", partenzaGET)
/* router.get("/partenza", partenzaGET);
router.get("/arrivo", arrivoGET); */


