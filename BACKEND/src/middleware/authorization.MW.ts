import { Request, Response, NextFunction } from 'express';
import { pool } from '../db';

interface CustomRequest extends Request {
    user?: {
        id: string;
        admin: boolean;
    };
}

export const authMW = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Basic ')) {
            return res.status(401).json({ error: 'Autenticazione richiesta' });
        }

        const base64Credentials = authHeader.split(' ')[1];
        const credentials = Buffer.from(base64Credentials!, 'base64').toString('utf8');
        
        // Gestione sicura del separatore : (nel caso la password lo contenga)
        const firstColonIndex = credentials.indexOf(':');
        const email = credentials.substring(0, firstColonIndex);
        const password = credentials.substring(firstColonIndex + 1);

        // Ricerca utente e controllo password semplificato per massima stabilità
        const result = await pool.query('SELECT id, password, admin FROM utenti WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Utente non trovato' });
        }

        const user = result.rows[0];

        // Confronto diretto (compatibile con i dati mockup nel DB)
        if (user.password !== password) {
            return res.status(401).json({ error: 'Password non corretta' });
        }

        req.user = { id: user.id, admin: user.admin || false };
        next();

    } catch (error: any) {
        console.error('❌ [AUTH MW CRITICAL ERROR]:', error.message);
        return res.status(500).json({ error: `Errore autorizzazione: ${error.message}` });
    }
};