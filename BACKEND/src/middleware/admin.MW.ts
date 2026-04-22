import { Response, NextFunction } from "express";
import { CustomRequest } from "./authorization.MW";

export const adminMW = async (req: CustomRequest, res: Response, next: NextFunction) => {
    if (req.user && req.user.admin) {
        next();
    } else {
        return res.status(403).json({ error: 'Accesso non autorizzato' });
    }
}