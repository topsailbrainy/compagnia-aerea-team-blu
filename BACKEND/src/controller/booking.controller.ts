import { Request, Response } from "express";
import { pool } from "../db";
import { Prenotazione } from "../types/prenotazione.type";
import { Ticket } from "@/types/ticket.type";

export function bookingGET(req: Request, res: Response) {
    try {
        const rows = pool.query("SELECT * FROM prenotazioni");
        return res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export function bookingGETbyId(req: Request, res: Response) {
    try {
        const rows = pool.query("SELECT * FROM prenotazioni WHERE id = $1 JOIN bilietti ON prenotazioni.id = billetti.id_prenotazione", [req.params.id]);
        return res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export function bookingPOST(req: Request, res: Response) {
    try {
        const rows = pool.query("INSERT INTO prenotazioni (id_utente) VALUES ($1)", [req.body.id_utente, req.body.id_volo]);
        return res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export function bookingDELETE(req: Request, res: Response) {
    try {
        const rows = pool.query("DELETE FROM prenotazioni WHERE id = $1", [req.params.id]);
        return res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export function bookingUPDATE(req: Request, res: Response) {
    try {
        const rows = pool.query("UPDATE prenotazioni SET id_utente = $1 WHERE id = $2", [req.body.id_utente, req.params.id]);
        return res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}