import { Router } from "express";
import { flightsGet  } from "@/controller/search.controller";

export const router = Router();

router.get("/flights/:origin/:destination/:date", flightsGet);