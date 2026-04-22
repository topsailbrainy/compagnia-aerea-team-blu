import { Router, Request, Response } from "express";
import { pool } from "../db";
import { recapGet } from "@/controller/recap.controller";
import { ticketPOST } from "@/controller/ticket.controller";

export const router = Router();

router.get("/recap", recapGet, ticketPOST)




    /* async (req: Request, res: Response) => {
    const { id_prenotazione } = req.params;

    try {
        const query = `
            SELECT 
                p.id AS id_prenotazione, 
                b.id AS id_biglietto, 
                v.id AS "Id volo", 
                v.gates_id AS gate_id, 
                u.name AS nome, 
                u.surname AS cognome, 
                u.codice_fiscale AS cf, 
                t.aereoporto_partenza, 
                t.aereoporto_arrivo 
            FROM biglietto b
            JOIN prenotazione p ON b.prenotazione_id = p.id
            JOIN utenti u ON p.user_id = u.id
            JOIN voli v ON b.volo_id = v.id
            JOIN tratte t ON v.tratte_id = t.id
            WHERE p.id = $1
        `;

        const result = await pool.query(query, [id_prenotazione]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Recap non trovato per la prenotazione specificata" });
        }

        res.json(result.rows);
    } catch (error) {
        console.error("Errore nell'esecuzione della query di recap:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
}); */
