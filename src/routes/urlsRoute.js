import { Router } from "express";
import { postUrls, getUrls, getUrlsOpen, deletUrls } from "../controllers/urlsController.js";
import { postUrlsValidation } from "../middlewares/postUrlsMiddleware.js";
import { getUrlsValidation } from "../middlewares/getUrlsMiddlewares.js";
import { getUrlsOpenValidation } from "../middlewares/getUrlsOpenMiddlewares.js";
import { deletetUrlsValidation } from "../middlewares/deleteUrlsMiddleware.js";

const routeUrls = Router();

routeUrls.post('/urls/shorten', postUrlsValidation, postUrls);
routeUrls.get('/urls/:id', getUrlsValidation, getUrls);
routeUrls.get('urls/open/:shortUrl', getUrlsOpenValidation, getUrlsOpen);
routeUrls.delete('/urls/:id', deletetUrlsValidation, deletUrls);

export default routeUrls;