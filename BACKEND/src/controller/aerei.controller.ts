import { Request, Response } from "express";
import { pool } from "../db";
import { Aerei } from "../types/aerei.type";

export function aereiGet(req: Request, res: Response) {
    try {
        const rows = pool.query("SELECT * FROM aerei");
        return res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export function aereiGetById(req: Request, res: Response) {
    try {
        const rows = pool.query("SELECT * FROM aerei WHERE id = $1", [req.params.id]);
        return res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export function aereiPost(req: Request, res: Response) {
    try {
        const rows = pool.query("INSERT INTO aerei (codice, modello, capienza) VALUES ($1, $2, $3)", [req.body.codice, req.body.modello, req.body.capienza]);
        return res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export function aereiUpdate(req: Request, res: Response) {
    try {
        const rows = pool.query("UPDATE aerei SET codice = $1, modello = $2, capienza = $3 WHERE id = $4", [req.body.codice, req.body.modello, req.body.capienza, req.params.id]);
        return res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export function aereiDelete(req: Request, res: Response) {
    try {
        const rows = pool.query("DELETE FROM aerei WHERE id = $1", [req.params.id]);
        return res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

