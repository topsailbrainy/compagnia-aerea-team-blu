//USER ROUTES 
import { Router } from "express";
import { loginPOST } from "../controller/login.controller";
import { registerPOST } from "../controller/register";


export const router = Router();

router.post("/login", loginPOST);
router.post("/register", registerPOST);
