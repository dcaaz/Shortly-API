import { connectionDB } from "../database/db.js";

export async function deletetUrlsValidation(req, res, next) {

    const { id } = req.params;

    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if(!token){
        return res.sendStatus(401);
    }

    try {

        const session = await connectionDB.query('SELECT * FROM sessions WHERE token=$1;',
        [token]);

        if (session.rowCount === 0){
            return res.sendStatus(401);
        }
        console.log("CHEGUEI AQUI!!")
        const user = await connectionDB.query('SELECT * FROM users JOIN urls ON users.id=urls.user_id WHERE url.id=$1;',
            [id]);
            console.log("CHEGUEI AQUI TAMBÉM!!")
            console.log("user", user)

        if (!user) {
            return res.sendStatus(401);
        }

    } catch (err) {
        console.log("err deletUrlValidation", err.message);
        res.status(500).send('Server not running');
    }

    next();
}