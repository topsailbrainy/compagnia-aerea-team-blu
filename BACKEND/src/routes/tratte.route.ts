import { Router } from "express";
import { partenzaGET , arrivoGET } from "@/controller/aereoporti.controller";


export const router = Router();

router.get("/search", partenzaGET, arrivoGET)
/* router.get("/partenza", partenzaGET);
router.get("/arrivo", arrivoGET); */