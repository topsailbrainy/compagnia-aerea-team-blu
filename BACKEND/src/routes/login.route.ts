import { Router } from "express";
import { loginPOST } from "../controller/login.controller";

export const router = Router();
router.post("/login", loginPOST);