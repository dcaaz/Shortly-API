import { connectionDB } from "../database/db.js";
import bcrypt from 'bcrypt';

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
    try {

    }
    catch (err) {
        console.log("err postSignin", err.message);
        res.status(500).send('Server not running');
    }
}
