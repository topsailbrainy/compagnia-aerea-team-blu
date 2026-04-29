import { Request, Response } from "express";
import { pool } from "../db";

export async function ticketGET(req: Request, res: Response) {
    const result = await pool.query("SELECT * FROM biglietto");
    return res.json(result.rows);
}

export async function ticketGETbyId(req: Request, res: Response) {
    const result = await pool.query("SELECT * FROM biglietto WHERE id = $1", [req.params.id]);
    return res.json(result.rows[0]);
}

export async function ticketPOST(req: Request, res: Response) {
    const { prenotazione_id, volo_id } = req.body;
    const result = await pool.query(
        "INSERT INTO biglietto (prenotazione_id, volo_id) VALUES ($1, $2) RETURNING *",
        [prenotazione_id, volo_id]
    );
    return res.json(result.rows[0]);
}

export async function ticketUPDATE(req: Request, res: Response) {
    const { prenotazione_id, volo_id } = req.body;
    const result = await pool.query(
        "UPDATE biglietto SET prenotazione_id = $1, volo_id = $2 WHERE id = $3 RETURNING *",
        [prenotazione_id, volo_id, req.params.id]
    );
    return res.json(result.rows[0]);
}

export async function ticketDELETE(req: Request, res: Response) {
    await pool.query("DELETE FROM biglietto WHERE id = $1", [req.params.id]);
    return res.json({ message: "Biglietto eliminato" });
}
