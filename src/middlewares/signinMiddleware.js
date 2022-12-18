import { connectionDB } from "../database/db.js";
import { signinSchema } from "../models/signinModel.js";
import bcrypt from 'bcrypt';

export async function signinValidation(req, res, next) {

    const dataSignin = req.body;

    try {

        const { error } = signinSchema.validate(dataSignin, { abortEarly: false });

        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(422).send(errors);
        }

        const userExist = await connectionDB.query("SELECT * FROM users WHERE email=$1", [dataSignin.email]);

        if (userExist.rowCount === 0) {
            return res.sendStatus(409);
        }

        const passwordExist = await connectionDB.query('SELECT password FROM users WHERE email=$1;', [dataSignin.email]);
        
        const passwordCrypted = passwordExist.rows[0].password;

        const passwordOk = bcrypt.compareSync(dataSignin.password, passwordCrypted);

        if (!passwordOk){
            return res.sendStatus(401);
        };

    } catch (err) {
        console.log("err signinValidation", err.message);
        res.status(500).send('Server not running');
    }

    req.dataUser = dataSignin;

    next();
}