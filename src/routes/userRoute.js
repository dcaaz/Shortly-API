import { Router } from "express";
import { postSignin, postSignup, getUsers } from "../controllers/userController.js";
import { signupValidation } from "../middlewares/signupMiddleware.js";
import { signinValidation } from "../middlewares/signinMiddleware.js";
import { getUsersValidation } from "../middlewares/getUsersMiddleware.js";

const routeUser = Router();

routeUser.post('/signup', signupValidation, postSignup);

routeUser.post('/signin', signinValidation, postSignin);

routeUser.post('/users/me', getUsersValidation, getUsers);

export default routeUser;