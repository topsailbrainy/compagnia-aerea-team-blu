
import { Request, Response } from "express";
import { pool } from "../db";
import { User } from "../types/user.type";  
import { CustomRequest } from "@/middleware/authorization.MW";

export function userGET(req: CustomRequest, res: Response) {
    try {
        const rows = pool.query("SELECT * FROM utenti");
        return res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export function userGETById(req: CustomRequest, res: Response) {
    try {
        if (req.user?.id != (req.params.id as string)) {
            return res.status(403).json({ error: 'Accesso non autorizzato' });
        }
        const rows = pool.query("SELECT * FROM utenti WHERE id = $1", [req.params.id]);
        return res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export function userDELETE(req: Request, res: Response) {
    try {
        const rows = pool.query("DELETE FROM utenti WHERE id = $1", [req.params.id]);
        return res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}
export function userPOST(req: Request, res: Response) {
    try {
        const rows = pool.query("INSERT INTO utenti (email, password) VALUES ($1, $2)", [req.body.email, req.body.password]);
        return res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export function userUPDATE(req: Request, res: Response) {
    try {
        const rows = pool.query("UPDATE utenti SET email = $1, password = $2 WHERE id = $3", [req.body.email, req.body.password, req.params.id]);
        return res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export function userDataGET(req: Request, res: Response) {
    try {
        const rows = pool.query("SELECT * FROM utenti WHERE id = $1 AND INNER JOIN documento ON documento.id = utenti.documento_id" , [req.params.id]);
        return res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}

export function cardDataGET(req: Request, res: Response) {
    try {
        const rows = pool.query("SELECT * FROM card WHERE id=$1 AND INNER JOIN utenti ON utenti.card_id = card.id" , [req.params.id]);
        return res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}