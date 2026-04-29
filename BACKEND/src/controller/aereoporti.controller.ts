import { Request, Response } from "express";
import { pool } from "../db";

export async function partenzaGET(req: Request, res: Response) {
    try {
        const result = await pool.query("SELECT name, codice_IATA FROM aereoporti");
        return res.json(result.rows);
    } catch (error: any) {
        return res.status(500).json({ error: `Errore database: ${error.message}` });
    }
}

export async function arrivoGET(req: Request, res: Response) {
    try {
        const result = await pool.query("SELECT codice_IATA, name FROM aereoporti");
        return res.json(result.rows);
    } catch (error: any) {
        return res.status(500).json({ error: `Errore database: ${error.message}` });
    }
}

export async function aereoportoGET(req: Request, res: Response) {
    try {
        const result = await pool.query("SELECT * FROM aereoporti");
        return res.json(result.rows);
    } catch (error: any) {
        return res.status(500).json({ error: `Errore database: ${error.message}` });
    }
}

export async function aereoportoPOST(req: Request, res: Response) {
    try {
        const { codice_IATA, name, city, country } = req.body;
        const result = await pool.query(
            "INSERT INTO aereoporti (codice_IATA, name, city, country) VALUES ($1, $2, $3, $4) RETURNING *", 
            [codice_IATA, name, city, country]
        );
        return res.json(result.rows[0]);
    } catch (error: any) {
        return res.status(500).json({ error: `Errore database: ${error.detail || error.message}` });
    }
}

export async function aereoportoDELETE(req: Request, res: Response) {
    try {
        await pool.query("DELETE FROM aereoporti WHERE codice_IATA = $1", [req.params.id]);
        return res.json({ message: "Aeroporto eliminato" });
    } catch (error: any) {
        return res.status(500).json({ error: `Errore database: ${error.detail || error.message}` });
    }
}

export async function aereoportoUPDATE(req: Request, res: Response) {
    try {
        const { codice_IATA, name, city, country } = req.body;
        const result = await pool.query(
            "UPDATE aereoporti SET codice_IATA = $1, name = $2, city = $3, country = $4 WHERE codice_IATA = $5 RETURNING *", 
            [codice_IATA, name, city, country, req.params.id]
        );
        return res.json(result.rows[0]);
    } catch (error: any) {
        return res.status(500).json({ error: `Errore database: ${error.detail || error.message}` });
    }
}