import { Request, Response } from "express";
import { pool } from "../db";
import { User } from "../types/user.type";  
import { CustomRequest } from "../middleware/authorization.MW";
import argon2 from "argon2";

export async function userGET(req: CustomRequest, res: Response) {
    try {
        const result = await pool.query("SELECT * FROM utenti");
        return res.json(result.rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export async function userGETById(req: CustomRequest, res: Response) {
    try {
        if (req.user?.id != (req.params.id as string)) {
            return res.status(403).json({ error: 'Accesso non autorizzato' });
        }
        const result = await pool.query("SELECT * FROM utenti WHERE id = $1", [req.params.id]);
        return res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export async function userDELETE(req: Request, res: Response) {
    try {
        await pool.query("DELETE FROM utenti WHERE id = $1", [req.params.id]);
        return res.json({ message: "Utente eliminato con successo" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export async function userPOST(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        const hashedPassword = await argon2.hash(password);
        const result = await pool.query("INSERT INTO utenti (email, password) VALUES ($1, $2) RETURNING id, email", [email, hashedPassword]);
        return res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export async function userUPDATE(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        let query = "UPDATE utenti SET email = $1";
        let params = [email];

        if (password) {
            const hashedPassword = await argon2.hash(password);
            query += ", password = $2 WHERE id = $3";
            params.push(hashedPassword, req.params.id);
        } else {
            query += " WHERE id = $2";
            params.push(req.params.id);
        }

        const result = await pool.query(query, params);
        return res.json({ message: "Utente aggiornato con successo" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export async function userDataGET(req: Request, res: Response) {
    try {
        const result = await pool.query("SELECT * FROM utenti INNER JOIN documento ON documento.id = utenti.documento_id WHERE utenti.id = $1" , [req.params.id]);
        return res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export async function cardDataGET(req: Request, res: Response) {
    try {
        const result = await pool.query("SELECT * FROM card INNER JOIN utenti ON utenti.card_id = card.id WHERE utenti.id = $1" , [req.params.id]);
        return res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}