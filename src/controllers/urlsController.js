import { connectionDB } from "../database/db.js";
import { nanoid } from 'nanoid';
import { customAlphabet } from 'nanoid';

export async function postUrls(req,res){
    const token = req.dataUser;
    const { url } = req.url;

    try{
        const tokenId = await connectionDB.query('SELECT user_id FROM sessions WHERE token=$1;', [token]);
        const userId = tokenId.rows[0].user_id; 

        const nanoid = customAlphabet('1234567890abcdef', 6)
        const shortUrl = nanoid();

        await connectionDB.query('INSERT INTO urls (user_id, url, short_url, views_counter) VALUES ($1, $2, $3, $4);', 
        [userId, url, shortUrl, 0])
        res.sendStatus(201);

    } catch (err){
        console.log("err postUrls", err.message);
        return res.status(500).send('Server not running');
    }
};