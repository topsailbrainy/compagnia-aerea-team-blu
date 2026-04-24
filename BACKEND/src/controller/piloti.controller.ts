import { Request, Response } from "express";
import { pool } from "../db";
import { Piloti } from "../types/piloti.type";

export const pilotiGET = async (req: Request, res: Response) => {
    try {
        const { rows } = await pool.query<Piloti>("SELECT * FROM piloti");
        return res.json({ count: rows.length, data: rows });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
};

export const pilotiGETById = async (req: Request, res: Response) => {
    try {
        const { rows } = await pool.query<Piloti>("SELECT * FROM piloti WHERE id = $1", [req.params.id]);
        return res.json({ count: rows.length, data: rows });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
};

export const pilotiPOST = async (req: Request, res: Response) => {
    try {
        const { rows } = await pool.query<Piloti>("INSERT INTO piloti (name, surname) VALUES ($1, $2) RETURNING *", [req.body.nome, req.body.cognome]);
        return res.json({ count: rows.length, data: rows });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
};

export const pilotiUPDATE = async (req: Request, res: Response) => {
    try {
        const { rows } = await pool.query<Piloti>("UPDATE piloti SET name = $1, surname = $2 WHERE id = $3 RETURNING *", [req.body.nome, req.body.cognome, req.params.id]);
        return res.json({ count: rows.length, data: rows });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
};

export const pilotiDELETE = async (req: Request, res: Response) => {
    try {
        const { rows } = await pool.query<Piloti>("DELETE FROM piloti WHERE id = $1 RETURNING *", [req.params.id]);
        return res.json({ count: rows.length, data: rows });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
};
