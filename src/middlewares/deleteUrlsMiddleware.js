import { connectionDB } from "../database/db.js";

export async function deletetUrlsValidation(req, res, next) {

    const { id } = req.params;

    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) {
        return res.sendStatus(401);
    }

    try {

        const session = await connectionDB.query('SELECT * FROM sessions WHERE token=$1;',
            [token]);

        if (session.rowCount === 0) {
            return res.sendStatus(401);
        }

        const userInfo = await connectionDB.query('SELECT * FROM users JOIN sessions ON users.id = sessions.user_id WHERE sessions.token=$1;',
            [token]);

        console.log("userInfo", userInfo)

        const userInfoUrl = await connectionDB.query('SELECT * FROM urls WHERE id=$1;',
            [id]);

        console.log("userInfoUrl", userInfoUrl)


        if (userInfoUrl.rowCount === 0) {
            return res.sendStatus(404);
        }

        if (userInfo.rows[0].id !== userInfoUrl.rows[0].user_id) {
            return res.sendStatus(401);
        }

        next();

    } catch (err) {
        console.log("err deletUrlValidation", err.message);
        res.status(500).send('Server not running');
    }
}