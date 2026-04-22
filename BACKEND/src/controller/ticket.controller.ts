import { Request, Response } from "express";
import { pool } from "../db";
import { Ticket } from "../types/ticket.type";
import { authMW } from "../middleware/authorization.MW";

export  function ticketGET(req: Request, res: Response) {
    try {
        const rows = pool.query("SELECT * FROM biglietto");
        return res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export function ticketGETbyId(req: Request, res: Response) {
    try {
        const rows = pool.query("SELECT * FROM biglietto WHERE id = $1", [req.params.id]);
        return res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export function ticketPOST(req: Request, res: Response) {
    try {
        const rows = pool.query("INSERT INTO biglietto (id_prenotazione,id_utente, id_volo ) VALUES ($1, $2, $3)", [req.body.id_prenotazione]);
        return res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export function ticketDELETE(req: Request, res: Response) {
    try {
        const rows = pool.query("DELETE FROM biglietto WHERE id, id_utente VALUES ($1, $2)", [req.params.id]);
        return res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}