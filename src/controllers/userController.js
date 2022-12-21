import bcrypt from 'bcrypt';
import { v4 as uuid } from "uuid";

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

export async function getUsers(req, res) {

    const id = req.idUser;

    try {

        const user = await connection.query(`
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

    } catch (err) {
        console.log("err getUsers", err.message);
        res.status(500).send('Server not running');
    }
}

