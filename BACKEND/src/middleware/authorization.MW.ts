import { Request, Response, NextFunction } from 'express';
import argon2 from 'argon2';
import { pool } from '../db'; // La tua istanza di connessione al DB

interface CustomRequest extends Request {
    user?: {
    id: string;
    admin: boolean;
    };
}

export const authMW = async (req: CustomRequest, res: Response, next: NextFunction) => {
    // 1. Estrazione header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
        res.setHeader('WWW-Authenticate', 'Basic realm="Flight Search API"');
        return res.status(401).json({ error: 'Autenticazione richiesta' });
    }

    // 2. Decodifica delle credenziali (Base64)
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials!, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');

    try {
        // 3. Ricerca dell'utente nel DB (Tabella utenti )
        const result = await pool.query('SELECT id, password FROM utenti WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Credenziali non valide' });
        }

        const user = result.rows[0];

        // 4. Verifica della password con Argon2
        const isPasswordValid = await argon2.verify(user.password, password!);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Credenziali non valide' });
        }

        if (!user.admin) {
            return res.status(403).json({ error: 'Accesso non autorizzato' });
        }

        // 5. Salvataggio dell'ID utente nella richiesta per usi futuri
        req.user = { id: user.id , admin: user.admin };
        next();

    } catch (error) {
        console.error('Errore durante auth:', error);
        return res.status(500).json({ error: 'Errore interno del server' });
    }
};