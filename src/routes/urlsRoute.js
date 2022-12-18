import { Router } from "express";
import { postUrls } from "../controllers/urlsController.js";
import { postUrlsValidation } from "../middlewares/postUrlsMiddleware.js";

const routeUrls = Router();

routeUrls.post('/urls/shorten', postUrlsValidation, postUrls);

export default routeUrls;