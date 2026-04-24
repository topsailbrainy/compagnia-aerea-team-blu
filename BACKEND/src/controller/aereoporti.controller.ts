
import { Request, Response } from "express";
import { pool } from "../db";
import { Aereoporto } from "../types/aereoporto.type";


// get aereoporti Partenza e Arrivo
export function partenzaGET(req: Request, res: Response) {
    try {
        const rows = pool.query("SELECT * codice_IATA, name FROM aereoporti");
        return res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
};
export function arrivoGET (req: Request, res: Response) {
    try {
        const rows  =  pool.query("SELECT * codice_IATA, name FROM aereoporti");
        return res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export function aereoportoGET(req: Request, res: Response) {
    try {
        const rows = pool.query("SELECT * FROM aereoporti");
        return res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}
export function aereoportoPOST(req: Request, res: Response) {
    try {
        const rows = pool.query("INSERT INTO aereoporti (codice_IATA, name) VALUES ($1, $2)", [req.body.codice_IATA, req.body.name]);
        return res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export function aereoportoDELETE(req: Request, res: Response) {
    try {
        const rows = pool.query("DELETE FROM aereoporti WHERE id = $1", [req.params.id]);
        return res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export function aereoportoUPDATE(req: Request, res: Response) {
    try {
        const rows = pool.query("UPDATE aereoporti SET codice_IATA = $1, name = $2 WHERE id = $3", [req.body.codice_IATA, req.body.name, req.params.id]);
        return res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}