import  { Request, Response } from 'express';
import { pool } from '../db';
import { User } from '../types/user.type';

//fetch per il login utente

export function loginGET(req: Request, res: Response) {
    try {
        const rows = pool.query("SELECT * FROM utenti WHERE email = $1", [req.params.email]);
        return res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}
