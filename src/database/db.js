import pgk from "pg";
import dotenv from 'dotenv';
dotenv.config();

const { Poll } = pgk;

export const connectionDB = new Pool({
    connectionSring: process.env.DATABASE_URL,
    ssl: true,
});