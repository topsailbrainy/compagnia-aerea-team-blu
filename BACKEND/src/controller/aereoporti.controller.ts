
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