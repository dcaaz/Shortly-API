import { connectionDB } from "../database/db.js";
import { nanoid } from 'nanoid';
import { customAlphabet } from 'nanoid';

export async function postUrls(req, res) {
    const token = req.dataUser;
    const { url } = req.url;

    try {

        const tokenId = await connectionDB.query('SELECT user_id FROM sessions WHERE token=$1;', [token]);
        const userId = tokenId.rows[0].user_id;

        const nanoid = customAlphabet('1234567890abcdef', 6)
        const shortUrl = nanoid();

        await connectionDB.query('INSERT INTO urls (user_id, url, short_url, views_counter) VALUES ($1, $2, $3, $4);',
            [userId, url, shortUrl, 0])

        const body = await connectionDB.query('SELECT urls.short_url AS "shortUrl" FROM urls WHERE url=$1',
            [url]);

        return res.send(body.rows[0]).status(201);

    } catch (err) {
        console.log("err postUrls", err.message);
        return res.status(500).send('Server not running');
    }
};

export async function getUrls(req, res) {

    const id = req.id;

    try {

        const bodyUrl = await connectionDB.query(`
        SELECT 
            user_id AS id, 
            short_url AS "shortUrl",
            url
        FROM
            urls
        WHERE
            id=$1`, [id]);


        const body = bodyUrl.rows[0]

        return res.send(body).status(200);

    } catch (err) {
        console.log("err getUrls", err.message);
        return res.status(500).send('Server not running');
    }
};

export async function getUrlsOpen(req, res) {

    const { shortUrl } = req.params;

    try {

        // const viewsCounter = await connectionDB.query(`SELECT views_counter FROM urls WHERE short_url=$1;`,
        //     [shortUrl]);

        // const newCounter = Number(viewsCounter.rows[0].views_counter) + 1;

        // console.log("newCounter", newCounter);

        //atualizar contador
        await connectionDB.query(`
            UPDATE 
                urls 
            SET 
                views_counter= views_counter +1
            WHERE 
                short_url=$1;`, [shortUrl]);

        //selecionar url
        const url = await connectionDB.query(`
            SELECT 
                 url
            FROM
                urls
            WHERE
                short_url=$1;`, [shortUrl]);

        //redirecionar para url
        return res.redirect(url.rows[0].url);

    } catch (err) {
        console.log("err getUrlsOpen", err.message);
        return res.status(500).send('Server not running');
    }
};

export async function deletUrls(req, res) {

    const { id } = req.params;

    try {

        await connectionDB.query('DELETE FROM urls WHERE id=$1', [id]);
        return res.sendStatus(204);

    } catch (err) {
        console.log("err deletetUrls", err.message);
        return res.status(500).send('Server not running');
    }
};

export async function getRanking(req, res) {
    console.log("cheguei");
    try {
        const ranking = await connectionDB.query(`
        SELECT us.id, us.name, 
        CASE WHEN COUNT(ur.*) = 0 THEN 0
        ELSE COUNT(ur.*) 
        END AS "linksCount", 
        CASE WHEN COUNT(ur.*) = 0 THEN 0 
        ELSE SUM(ur.views_counter) 
        END AS "visitCount" 
        FROM users AS us 
        LEFT JOIN urls AS ur 
        ON ur.user_id = us.id 
        GROUP BY us.id 
        ORDER BY "visitCount" DESC, "linksCount" DESC
        LIMIT 10;`
        );

        return res.send(ranking.rows).status(200);

    } catch (err) {
        console.log("err getRanking", err.message);
        return res.status(500).send('Server not running');
    }
};