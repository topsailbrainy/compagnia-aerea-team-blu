import { Request, Response } from "express";
import { pool } from "../db";
import { Pilot } from "../types/piloti.type";

export const pilotiGET = async (req: Request, res: Response) => {
    try {
        const { rows } = await pool.query<Pilot>("SELECT * FROM piloti");
        return res.json({ count: rows.length, data: rows });
    } catch (error: any) {
        return res.status(500).json({ error: `Errore database: ${error.message}` });
    }
};

export const pilotiGETById = async (req: Request, res: Response) => {
    try {
        const { rows } = await pool.query<Pilot>("SELECT * FROM piloti WHERE id = $1", [req.params.id]);
        return res.json({ count: rows.length, data: rows });
    } catch (error: any) {
        return res.status(500).json({ error: `Errore database: ${error.message}` });
    }
};

export const pilotiPOST = async (req: Request, res: Response) => {
    try {
        const { rows } = await pool.query<Pilot>("INSERT INTO piloti (name, surname) VALUES ($1, $2) RETURNING *", [req.body.nome, req.body.cognome]);
        return res.json({ count: rows.length, data: rows });
    } catch (error: any) {
        return res.status(500).json({ error: `Errore database: ${error.detail || error.message}` });
    }
};

export const pilotiUPDATE = async (req: Request, res: Response) => {
    try {
        const { rows } = await pool.query<Pilot>("UPDATE piloti SET name = $1, surname = $2 WHERE id = $3 RETURNING *", [req.body.nome, req.body.cognome, req.params.id]);
        return res.json({ count: rows.length, data: rows });
    } catch (error: any) {
        return res.status(500).json({ error: `Errore database: ${error.detail || error.message}` });
    }
};

export const pilotiDELETE = async (req: Request, res: Response) => {
    try {
        const { rows } = await pool.query<Pilot>("DELETE FROM piloti WHERE id = $1 RETURNING *", [req.params.id]);
        return res.json({ count: rows.length, data: rows });
    } catch (error: any) {
        return res.status(500).json({ error: `Errore database: ${error.detail || error.message}` });
    }
};