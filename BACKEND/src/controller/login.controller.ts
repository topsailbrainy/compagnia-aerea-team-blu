import { Request, Response } from 'express';
import { pool } from '../db';

export async function loginPOST(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ error: "Email e password obbligatorie." });
        }

        // Confronto semplice (compatibile con i dati mockup e il sistema Basic Auth corrente)
        const result = await pool.query("SELECT * FROM utenti WHERE email = $1 AND password = $2", [email, password]);
        
        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Email o password errati." });
        }

        const user = result.rows[0];
        const { password: _, ...userWithoutPassword } = user;
        
        return res.json({ 
            message: "Login effettuato con successo",
            user: userWithoutPassword 
        });

    } catch (error) {
        console.error("Errore durante il login:", error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}