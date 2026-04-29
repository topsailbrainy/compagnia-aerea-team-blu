import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
    user?: {
        id: string;
        admin: boolean;
    };
}

export const adminMW = async (req: CustomRequest, res: Response, next: NextFunction) => {
    if (req.user && req.user.admin) {
        next();
    } else {
        return res.status(403).json({ error: 'Accesso non autorizzato' });
    }
}