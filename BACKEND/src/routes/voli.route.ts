import { Router } from "express";
import { trattaGet  } from "@/controller/search.controller";

export const router = Router();

router.get("/flights/:origin/:destination/:date", trattaGet);