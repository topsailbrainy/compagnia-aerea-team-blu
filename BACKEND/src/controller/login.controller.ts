import { Request, Response } from 'express';
import { pool } from '../db';
import { User } from '../types/user.type';
import * as jose from 'jose';
import argon2 from 'argon2';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret');

export async function loginPOST(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
        const result = await pool.query<User>('SELECT * FROM utenti WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ error: 'Credenziali non valide' });
        }

        const isPasswordValid = await argon2.verify(user.password, password);

        if (isPasswordValid) {
            const token = await new jose.SignJWT({ id: user.id, email: user.email, admin: user.admin })
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime('24h')
                .sign(JWT_SECRET);

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000 // 24 ore
            });

            return res.json({ message: 'Login effettuato con successo', user: { email: user.email, admin: user.admin } });
        } else {
            return res.status(401).json({ error: 'Credenziali non valide' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Errore interno del server' });
    }
}
