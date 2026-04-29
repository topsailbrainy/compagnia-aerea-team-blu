import { Request, Response } from "express";
import { pool } from "../db";

export async function aereiGet(req: Request, res: Response) {
    try {
        const result = await pool.query("SELECT * FROM aerei");
        return res.json(result.rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export async function aereiGetById(req: Request, res: Response) {
    try {
        const result = await pool.query("SELECT * FROM aerei WHERE id = $1", [req.params.id]);
        return res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export async function aereiPost(req: Request, res: Response) {
    try {
        const { modello, capienza } = req.body;
        const result = await pool.query("INSERT INTO aerei (modello, capienza) VALUES ($1, $2) RETURNING *", [modello, capienza]);
        return res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export async function aereiUpdate(req: Request, res: Response) {
    try {
        const { modello, capienza } = req.body;
        const result = await pool.query("UPDATE aerei SET modello = $1, capienza = $2 WHERE id = $3 RETURNING *", [modello, capienza, req.params.id]);
        return res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export async function aereiDelete(req: Request, res: Response) {
    try {
        await pool.query("DELETE FROM aerei WHERE id = $1", [req.params.id]);
        return res.json({ message: "Aereo eliminato" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}
