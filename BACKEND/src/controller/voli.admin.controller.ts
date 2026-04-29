import { Request, Response } from "express";
import { pool } from "../db";

export async function voliGet(req: Request, res: Response) {
    try {
        const result = await pool.query(`
            SELECT v.*, tr.aereoporto_partenza, tr.aereoporto_arrivo 
            FROM voli v
            LEFT JOIN tratte tr ON v.tratte_id = tr.id
            ORDER BY v.data_partenza DESC, v.orario_partenza DESC
        `);
        return res.json(result.rows);
    } catch (error: any) {
        console.error("❌ [ADMIN VOLI GET ERROR]:", error.message);
        return res.status(500).json({ error: `Errore database: ${error.message}` });
    }
}

export async function voliPost(req: Request, res: Response) {
    try {
        const { tratte_id, aerei_id, piloti_id, gate_id, data_partenza, orario_partenza, orario_arrivo } = req.body;
        const result = await pool.query(
            `INSERT INTO voli (tratte_id, aerei_id, piloti_id, gate_id, data_partenza, orario_partenza, orario_arrivo) 
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [tratte_id, aerei_id, piloti_id, gate_id, data_partenza, orario_partenza, orario_arrivo]
        );
        return res.status(201).json(result.rows[0]);
    } catch (error: any) {
        return res.status(500).json({ error: `Errore database: ${error.detail || error.message}` });
    }
}

export async function voliDelete(req: Request, res: Response) {
    try {
        await pool.query("DELETE FROM voli WHERE id = $1", [req.params.id]);
        return res.json({ message: "Volo eliminato con successo" });
    } catch (error: any) {
        return res.status(500).json({ error: `Errore database: ${error.detail || error.message}` });
    }
}

export async function voliUpdate(req: Request, res: Response) {
    try {
        const { data_partenza, orario_partenza, orario_arrivo } = req.body;
        const result = await pool.query(
            "UPDATE voli SET data_partenza = $1, orario_partenza = $2, orario_arrivo = $3 WHERE id = $4 RETURNING *",
            [data_partenza, orario_partenza, orario_arrivo, req.params.id]
        );
        return res.json(result.rows[0]);
    } catch (error: any) {
        return res.status(500).json({ error: `Errore database: ${error.detail || error.message}` });
    }
}
