import z, { ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import { id } from "zod/v4/locales";

const adminschema = z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    surname: z.string().optional(),    
    email: z.email(),
    password: z.string().min(8, "Password must be at least 8 characters long").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"),
    documento_id: z.number().optional(),
    card_id: z.number().optional(),
    admin: z.boolean()
})

export const adminLogMW = (req: Request, res: Response, next: NextFunction) => {
    const {error} = adminschema.safeParse(req.body);
    if (error) {
        return res.status(400).json({error: error.message});
    }
    next();}