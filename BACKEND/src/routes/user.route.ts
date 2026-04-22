//USER ROUTES 
import { Router } from "express";
import { userGET, userDELETE, userGETById, userUPDATE, userPOST } from "../controller/user.controller";
import { adminMW } from "@/middleware/admin.MW";
import { authMW } from "@/middleware/authorization.MW";
import { bookingGET, bookingGETbyId } from "@/controller/booking.controller";

export const router = Router();

router.get("/user", authMW, adminMW,userGET);
router.get("/user/:id", authMW, userGETById);
router.patch("/user/:id", authMW, userUPDATE);
router.delete("/user/:id", authMW, adminMW, userDELETE);
router.post("/user", userPOST);
router.get("/user/bookings", authMW, bookingGET);
router.get("/user/bookings/:id", authMW, bookingGETbyId);