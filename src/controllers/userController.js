import { connectionDB } from "../database/db.js";
import bcrypt from 'bcrypt';
import {v4 as uuid} from "uuid";

export async function postSignup(req, res) {
    const dataSignup = req.dataUser
    
    try {

        let encryptPassword = bcrypt.hashSync(dataSignup.password, 12);

        await connectionDB.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3);', 
        [dataSignup.name, dataSignup.email, encryptPassword]);

        res.sendStatus(201);

    } catch (err) {
        console.log("err postSignup", err.message);
        res.status(500).send('Server not running');
    }
}

export async function postSignin(req, res) {
    const dataSignin = req.dataUser;
    const token = uuid();

    console.log("CHEGUEI AQUI!!");
    try {

        const userId = await connectionDB.query('SELECT id FROM users WHERE email=$1;', [dataSignin.email]);

        console.log("userId", userId)

        await connectionDB.query('INSERT INTO sessions (user_id, token) VALUES ($1, $2);', [userId.rows[0].id, token]);
        res.sendStatus(200);
    }
    catch (err) {
        console.log("err postSignin", err.message);
        res.status(500).send('Server not running');
    }
}
