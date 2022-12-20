import { connectionDB } from "../database/db.js";

export async function getUrlsOpenValidation(req, res, next) {
    const { shortUrl } = req.params;

    try {
        
        const existShort = await connectionDB.query(`SELECT short_url FROM urls WHERE short_url=$1;`, [shortUrl]);

        if (existShort.rowCount === 0) {
            res.sendStatus(404);
        }

    } catch (err) {
        console.log("err getUrlOpenValidation", err.message);
        res.status(500).send('Server not running');
    }

    next();
}