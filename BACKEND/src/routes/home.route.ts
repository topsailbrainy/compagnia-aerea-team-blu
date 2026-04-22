//GHOAN AIRLINES HOME
import { Router } from "express";
import { partenzaGET , arrivoGET } from "../controller/aereoporti.controller";


export const router = Router();
// barra di ricerca che restituisce areoporti partenza e arrivo
router.get("/", partenzaGET, arrivoGET)
/* router.get("/partenza", partenzaGET);
router.get("/arrivo", arrivoGET); */


