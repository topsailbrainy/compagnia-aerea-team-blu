import { Request, Response } from 'express';
import { pool } from '../db';

export async function profileGET(req: any, res: Response) {
    try {
        const userId = req.user.id;

        // 1. Dati Utente
        const userResult = await pool.query(`
            SELECT u.name, u.surname, u.email, 
                   d.tipo as doc_tipo, d.numero as doc_numero, d.scadenza as doc_scadenza,
                   c.tipo as card_tipo, c.numero as card_numero, c.scadenza as card_scadenza
            FROM utenti u
            LEFT JOIN documento d ON u.documento_id = d.id
            LEFT JOIN card c ON u.card_id = c.id
            WHERE u.id = $1
        `, [userId]);

        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: "Utente non trovato" });
        }

        const user = userResult.rows[0];

        // 2. Storico Prenotazioni (Uso LEFT JOIN per mostrare la prenotazione anche se il biglietto è fallito)
        const bookingsResult = await pool.query(`
            SELECT 
                p.id as booking_id,
                b.id as ticket_id,
                v.data_partenza, v.orario_partenza,
                tr.aereoporto_partenza as origin_iata,
                tr.aereoporto_arrivo as dest_iata,
                tr.prezzo
            FROM prenotazione p
            LEFT JOIN biglietto b ON p.id = b.prenotazione_id
            LEFT JOIN voli v ON b.volo_id = v.id
            LEFT JOIN tratte tr ON v.tratte_id = tr.id
            WHERE p.user_id = $1
            ORDER BY p.id DESC
        `, [userId]);

        console.log(`[PROFILE] Utente ${userId}: trovate ${bookingsResult.rows.length} righe di prenotazione.`);

        return res.json({
            user: {
                name: user.name,
                surname: user.surname,
                email: user.email,
                document: user.doc_tipo ? { tipo: user.doc_tipo, numero: user.doc_numero, scadenza: user.doc_scadenza } : null,
                card: user.card_tipo ? { tipo: user.card_tipo, numero: user.card_numero, scadenza: user.card_scadenza } : null
            },
            bookings: bookingsResult.rows
        });

    } catch (error) {
        console.error("Errore recupero profilo:", error);
        return res.status(500).json({ error: "Errore interno" });
    }
}
