import { Request, Response } from 'express';
import { pool } from '../db';

export async function registerPOST(req: Request, res: Response) {
    const { name, surname, email, password } = req.body;

    try {
        if (!name || !surname || !email || !password) {
            return res.status(400).json({ error: "Tutti i campi sono obbligatori." });
        }

        // Verifica se l'utente esiste già
        const existingUser = await pool.query("SELECT * FROM utenti WHERE email = $1", [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: "Email già registrata." });
        }

        // Inserimento utente con password in chiaro (per compatibilità corrente)
        const result = await pool.query(
            "INSERT INTO utenti (name, surname, email, password, admin) VALUES ($1, $2, $3, $4, false) RETURNING id, email",
            [name, surname, email, password]
        );

        return res.status(201).json({
            message: "Utente registrato con successo",
            user: result.rows[0]
        });

    } catch (error) {
        console.error("Errore durante la registrazione:", error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}
