import pgk from "pg";
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pgk;

//  export const connectionDB = new Pool({
//     connectionSring: process.env.DATABASE_URL
//  });

export const connectionDB = new Pool({
     host: process.env.HOST,
     port: process.env.PORT,
     user: process.env.USER_DB,
     password: process.env.PASSWORD,
     database: process.env.DATABASE
 });