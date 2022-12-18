import { Router } from "express";
import { postSignin, postSignup } from "../controllers/userController.js";
import { signupValidation } from "../middlewares/signupMiddleware.js";

const routeUser = Router();

routeUser.post('/signup', signupValidation, postSignup);

routeUser.post('/signin', postSignin);

export default routeUser;