import { connectionDB } from "../database/db.js";
import { postUrlsSchema } from "../models/postUrlsModel.js";

export async function postUrlsValidation(req, res, next) {

    const url = req.body;

    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    try {

        const { error } = postUrlsSchema.validate(url, { abortEarly: false });

        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(422).send(errors);
        }

        const session = await connectionDB.query('SELECT * FROM sessions WHERE token=$1',
            [token]);


        if (session.rowCount === 0) {
            return res.sendStatus(401);
        }

        req.url = url
        req.dataUser = token;
        next();

    } catch (err) {
        console.log("err postUrlValidation", err);
        res.status(500).send('Server not running');
    }
}