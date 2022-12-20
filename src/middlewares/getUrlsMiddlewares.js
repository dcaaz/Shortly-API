import { connectionDB } from "../database/db.js";

export async function getUrlsValidation(req, res, next) {
    console.log("CHEGUEI AQUI")
    const { id } = req.params;
    console.log("id", id);

    try {

        const shortUrl = await connectionDB.query('SELECT short_url FROM urls WHERE id=$1;',
            [id]);
        console.log("shortUrl", shortUrl)

        if (shortUrl.rowCount === 0) {
            res.sendStatus(410);
        }

    } catch (err) {
        console.log("err getUrlValidation", err.message);
        res.status(500).send('Server not running');
    }

    req.id = id

    next();
}