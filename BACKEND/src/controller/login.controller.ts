import  { Request, Response } from 'express';
import { pool } from '../db';
import { User } from '../types/user.type';

//fetch per il login utente

export async function loginPOST(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
        const rows = await pool.query<User>('SELECT * FROM utenti WHERE email = $1 AND password = $2', [email, password]);
        const user = rows.rows[0];
        if (user) {
            return res.json({ token: Buffer.from(user.email + ':' + user.password!, 'base64').toString('ascii') });
        } else {
            return res.status(401).json({ error: 'Credenziali non valide' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Errore interno del server' });
    }
}
