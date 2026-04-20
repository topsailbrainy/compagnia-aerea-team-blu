import { Pool } from "pg";


export const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

console.log(process.env.DB_HOST, process.env.DB_PORT, process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD);