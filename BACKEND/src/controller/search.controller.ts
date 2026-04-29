//SEARCH ROUTES CON WIDGET PER RICERCA BIGLIETTO, PRENOTAZIONE, PAGAMENTO
import { Router } from "express";
import { Request, Response } from "express";
import { pool } from "../db";

export const router = Router();

export async function flightsGet(req: Request, res: Response) {
    try {
        const { origin, destination, date } = req.body;

        if (!origin || !destination) {
            return res.status(400).json({ error: "Origine e destinazione obbligatorie." });
        }

        const params = date ? [origin, destination, date] : [origin, destination];
        const sql = `SELECT v.id as id, v.data_partenza, v.orario_partenza, v.orario_arrivo, 
                    tr.aereoporto_partenza, tr.aereoporto_arrivo, tr.prezzo 
             FROM voli v
             INNER JOIN tratte tr ON v.tratte_id = tr.id

             WHERE tr.aereoporto_partenza = $1
               AND tr.aereoporto_arrivo = $2
               ${date ? "AND v.data_partenza = $3::date" : ""}`;

        const result = await pool.query(sql, params);
        return res.json(result.rows);

    } catch (error) {
        console.error("❌ [flightsGet] errore:", error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export async function trattaGet(req: Request, res: Response) {
    try {
        const result = await pool.query("SELECT * FROM tratte");
        return res.json(result.rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export async function trattaPost(req: Request, res: Response) {
    try {
        const { aereoporto_partenza, aereoporto_arrivo, distanza, prezzo } = req.body;
        const result = await pool.query(
            "INSERT INTO tratte (aereoporto_partenza, aereoporto_arrivo, distanza, prezzo) VALUES ($1, $2, $3, $4) RETURNING *", 
            [aereoporto_partenza, aereoporto_arrivo, distanza, prezzo]
        );
        return res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export async function trattaDelete(req: Request, res: Response) {
    try {
        await pool.query("DELETE FROM tratte WHERE id = $1", [req.params.id]);
        return res.json({ message: "Tratta eliminata" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export async function prezzoUpdate(req: Request, res: Response) {
    try {
        const { prezzo } = req.body;
        const result = await pool.query(
            "UPDATE tratte SET prezzo = $1 WHERE id = $2 RETURNING *", 
            [prezzo, req.params.id]
        );
        return res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export default router;
