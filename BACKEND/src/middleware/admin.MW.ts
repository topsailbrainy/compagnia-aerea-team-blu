import { Request, Response, NextFunction } from "express";

export const adminMW = async (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.admin) {
        next();
    } else {
        return res.status(403).json({ error: 'Accesso non autorizzato' });
    }
}