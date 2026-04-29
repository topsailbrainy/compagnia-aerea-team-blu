import { Request, Response } from "express";
import { pool } from "../db";

export async function bookingPOST(req: any, res: Response) {
    try {
        const userId = req.user?.id || req.body.user_id;
        const { flightIds } = req.body;

        if (!userId) {
            return res.status(400).json({ error: "ID utente mancante o non autorizzato." });
        }

        // 1. Creazione della prenotazione
        const bookingResult = await pool.query(
            "INSERT INTO prenotazione (user_id) VALUES ($1) RETURNING id",
            [userId]
        );
        const bookingId = bookingResult.rows[0].id;

        // 2. Inserimento biglietti
        if (Array.isArray(flightIds)) {
            for (const fId of flightIds) {
                const flightId = parseInt(fId);
                
                // IMPORTANTE: Un ID SERIAL non può essere 0 o inferiore.
                // Se è 0, lo saltiamo per evitare il Foreign Key Error (500).
                if (!isNaN(flightId) && flightId > 0) {
                    try {
                        await pool.query(
                            "INSERT INTO biglietto (prenotazione_id, volo_id) VALUES ($1, $2)",
                            [bookingId, flightId]
                        );
                    } catch (err: any) {
                        console.error(`[DB ERROR] Impossibile inserire biglietto per volo ${flightId}:`, err.detail || err.message);
                        // Continuiamo con gli altri biglietti invece di crashare tutto
                    }
                } else {
                    console.warn(`[BOOKING] Saltato volo con ID non valido: ${fId}`);
                }
            }
        }

        return res.status(201).json({
            message: "Prenotazione elaborata",
            bookingId: bookingId
        });

    } catch (error: any) {
        console.error("❌ [BOOKING FATAL ERROR]:", error.message);
        return res.status(500).json({ error: error.message || "Errore interno del server" });
    }
}

// ... rest of the functions (bookingGET, etc.)
export async function bookingGET(req: Request, res: Response) {
    try {
        // Query più ricca per l'admin: vediamo anche chi ha prenotato
        const result = await pool.query(`
            SELECT p.id, u.email as user_email, u.name as user_name, u.surname as user_surname
            FROM prenotazione p
            LEFT JOIN utenti u ON p.user_id = u.id
        `);
        return res.json(result.rows);
    } catch (error: any) {
        console.error("❌ [ADMIN BOOKING GET ERROR]:", error.message);
        return res.status(500).json({ error: `Errore database: ${error.detail || error.message}` });
    }
}

export async function bookingGETbyId(req: Request, res: Response) {
    try {
        const result = await pool.query(`
            SELECT p.*, b.id as ticket_id, b.volo_id 
            FROM prenotazione p 
            LEFT JOIN biglietto b ON p.id = b.prenotazione_id 
            WHERE p.id = $1
        `, [req.params.id]);
        return res.json(result.rows);
    } catch (error) {
        return res.status(500).json({ error: "Prenotazione non trovata" });
    }
}

export async function bookingDELETE(req: Request, res: Response) {
    try {
        await pool.query("DELETE FROM prenotazione WHERE id = $1", [req.params.id]);
        return res.json({ message: "Prenotazione eliminata" });
    } catch (error) {
        return res.status(500).json({ error: "Errore eliminazione" });
    }
}

export async function bookingUPDATE(req: Request, res: Response) {
    try {
        const { user_id } = req.body;
        const result = await pool.query(
            "UPDATE prenotazione SET user_id = $1 WHERE id = $2 RETURNING *", 
            [user_id, req.params.id]
        );
        return res.json(result.rows[0]);
    } catch (error) {
        return res.status(500).json({ error: "Errore aggiornamento" });
    }
}