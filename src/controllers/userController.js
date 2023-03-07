import bcrypt from 'bcrypt';
import { v4 as uuid } from "uuid";
import { connectionDB } from '../database/db.js';

export async function postSignup(req, res) {
    const dataSignup = req.dataUser

    try {

        let encryptPassword = bcrypt.hashSync(dataSignup.password, 12);

        await connectionDB.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3);',
            [dataSignup.name, dataSignup.email, encryptPassword]);

        return res.sendStatus(201);

    } catch (err) {
        console.log("err postSignup", err.message);
        return res.status(500).send('Server not running', err.message);
    }
}

export async function postSignin(req, res) {
    const dataSignin = req.dataUser;
    const token = uuid();

    try {

        const userId = await connectionDB.query('SELECT id FROM users WHERE email=$1;', [dataSignin.email]);

        await connectionDB.query('INSERT INTO sessions (user_id, token) VALUES ($1, $2);', [userId.rows[0].id, token]);
        return res.status(200).send(token);
        
    }
    catch (err) {
        console.log("err postSignin", err.message);
        return res.status(500).send('Server not running', err.message);
    }
}

export async function getUsers(req, res) {

    const id = req.idUser;

    try {

        const user = await connectionDB.query(`
        SELECT 
        users.id, users.name, sum(urls.views_counter) AS "visitCount",
        JSON_AGG(JSON_BUILD_OBJECT(
            'id', urls.id, 'shortUrl', urls.short_url,'url', urls.url, 'visitCount',urls.views_counter)
            ) AS "shortedUrls"
        FROM users
        JOIN urls
        ON urls.user_id = users.id
        WHERE users.id=$1
        GROUP BY users.id;`, [id]);
    
        return res.status(200).send(user.rows[0]);

    } catch (err) {
        console.log("err getUsers", err.message);
        return res.status(500).send('Server not running', err.message);
    }
}

