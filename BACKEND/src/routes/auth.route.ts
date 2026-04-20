import { Router } from "express";
import { authMW } from "../middleware/authorization.MW";

export const router = Router();

router.use("/auth", (req, res) => res.json({ message: "Hello World" }));