import { Request, Response } from "express";
import { pool } from "../db";

export async function userGET(req: Request, res: Response) {
    try {
        // Selezioniamo i campi necessari, escludendo la password per sicurezza
        const result = await pool.query("SELECT id, name, surname, email, admin FROM utenti");
        return res.json(result.rows);
    } catch (error: any) {
        console.error("❌ [ADMIN USER GET ERROR]:", error.message);
        return res.status(500).json({ error: `Errore caricamento utenti: ${error.message}` });
    }
}

export async function userGETById(req: Request, res: Response) {
    try {
        const result = await pool.query("SELECT id, name, surname, email, admin FROM utenti WHERE id = $1", [req.params.id]);
        return res.json(result.rows[0]);
    } catch (error: any) {
        return res.status(500).json({ error: "Utente non trovato" });
    }
}

export async function userPOST(req: Request, res: Response) {
    try {
        const { name, surname, email, password, admin } = req.body;
        const result = await pool.query(
            "INSERT INTO utenti (name, surname, email, password, admin) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, surname, email, admin",
            [name, surname, email, password, admin || false]
        );
        return res.status(201).json(result.rows[0]);
    } catch (error: any) {
        return res.status(500).json({ error: `Errore creazione utente: ${error.message}` });
    }
}

export async function userDELETE(req: Request, res: Response) {
    try {
        await pool.query("DELETE FROM utenti WHERE id = $1", [req.params.id]);
        return res.json({ message: "Utente eliminato" });
    } catch (error: any) {
        return res.status(500).json({ error: `Errore eliminazione: ${error.message}` });
    }
}

export async function userUPDATE(req: Request, res: Response) {
    try {
        const { name, surname, email, admin } = req.body;
        const result = await pool.query(
            "UPDATE utenti SET name = $1, surname = $2, email = $3, admin = $4 WHERE id = $5 RETURNING id, name, surname, email, admin",
            [name, surname, email, admin, req.params.id]
        );
        return res.json(result.rows[0]);
    } catch (error: any) {
        return res.status(500).json({ error: `Errore aggiornamento: ${error.message}` });
    }
}

export async function cardDataForAdmin(req: Request, res: Response) {
    try {
        const result = await pool.query("SELECT * FROM card");
        return res.json(result.rows);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

export async function documentDataforAdmin(req: Request, res: Response) {
    try {
        const result = await pool.query("SELECT * FROM documento");
        return res.json(result.rows);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}
