import { Router } from "express";
import { postSignin, postSignup } from "../controllers/userController.js";
import { signupValidation } from "../middlewares/signupMiddleware.js";
import { signinValidation } from "../middlewares/signinMiddleware.js";

const routeUser = Router();

routeUser.post('/signup', signupValidation, postSignup);

routeUser.post('/signin', signinValidation, postSignin);

export default routeUser;