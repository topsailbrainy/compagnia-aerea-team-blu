import { Request, Response, NextFunction } from 'express';
import * as jose from 'jose';
import NodeCache from 'node-cache';

export interface CustomRequest extends Request {
    user: {
        id: string;
        email?: string;
        admin: boolean;
    };
}

const cache = new NodeCache({ stdTTL: 600, checkperiod: 60 });
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret');

export const authMW = async (req: CustomRequest, res: Response, next: NextFunction) => {
    // 1. Estrazione del token dai cookies
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ error: 'Autenticazione richiesta' });
    }

    // 2. Controllo della cache
    if (cache.has(token)) {
        req.user = cache.get(token) as CustomRequest['user'];
        next();
        return;
    }

    try {
        // 3. Verifica del JWT
        const { payload } = await jose.jwtVerify(token, JWT_SECRET);

        const userData = {
            id: payload.id as string,
            email: payload.email as string,
            admin: payload.admin as boolean
        };

        // 4. Salvataggio in cache
        cache.set(token, userData);

        // 5. Salvataggio dell'utente nella richiesta
        req.user = userData;
        next();
    } catch (error) {
        console.error('Errore durante la verifica del JWT:', error);
        return res.status(401).json({ error: 'Token non valido o scaduto' });
    }
};