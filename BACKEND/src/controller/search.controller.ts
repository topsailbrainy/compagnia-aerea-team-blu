//SEARCH ROUTES CON WIDGET PER RICERCA BIGLIETTO, PRENOTAZIONE, PAGAMENTO

import { Request, Response } from "express";
import { pool } from "../db";
import { Tratta } from "@/types/tratta.type";
import { Voli } from "@/types/flights.type";
//get dei voli


/* 
router.get("/search", async (req: Request, res: Response) => {
    const { origin, destination, date } = req.query;
    // presenza dei parametri origin e destination nel query string
    if (!origin || !destination) {
        return res.status(400).json({ error: "Origine e destinazione obbligatorie." });} 
    // Aggiunta dinamica del filtro origin e destination
        try{
            let queryText = "SELECT * FROM tratte WHERE codice_IATA = $1 AND codice_IATA = $2 AND data_partenza = $3";
            const values: any[] = [(origin as string).toUpperCase(), (destination as string).toUpperCase(), date];
            // Aggiunta dinamica del filtro data se presente
            if (date) {
                values.push(date);
                queryText += ' AND departure_date::date = $3';} 
            const {rows}: {rows: Tratta[]} = await pool.query<Tratta>(queryText, values);
            return res.json({count: rows.length, data: rows});
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Errore interno del server" });
    }
}); */

export function trattaGet (req: Request, res: Response) {
    try {
        const rows = pool.query("SELECT * FROM tratte WHERE aereporto_partenza = $1 AND aereporto_arrivo = $2 AND data_partenza = $3 AND prezzo = $4", [req.params.origin, req.params.destination, req.params.date]);
        //const values: any[] = [(req.params.origin as string).toUpperCase(), (req.params.destination as string).toUpperCase(), req.params.date];
        if (!req.params.origin || !req.params.destination) {
            return res.status(400).json({ error: "Origine e destinazione obbligatorie." });
        }
        return res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export function trattaPost (req: Request, res: Response) {
    try {
        const rows = pool.query("INSERT INTO tratte (aereporto_partenza, aereporto_arrivo, data_partenza, prezzo) VALUES ($1, $2, $3, $4)", [req.body.origin, req.body.destination, req.body.date, req.body.price]);
        return res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export function trattaDelete (req: Request, res: Response) {
    try {
        const rows = pool.query("DELETE FROM tratte WHERE id = $1", [req.params.id]);
        return res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export function prezzoUpdate (req: Request, res: Response) {
    try {
        const rows = pool.query("UPDATE tratte SET prezzo = $1 WHERE id = $2", [req.body.price, req.params.id]);
        return res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}


                
