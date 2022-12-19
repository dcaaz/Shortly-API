import { Router } from "express";
import { postUrls, getUrls, getUrlsOpen, deletUrls } from "../controllers/urlsController.js";
import { postUrlsValidation } from "../middlewares/postUrlsMiddleware.js";

const routeUrls = Router();

routeUrls.post('/urls/shorten', postUrlsValidation, postUrls);
routeUrls.get('/urls/:id', getUrls);
routeUrls.get('urls/open/:shortUrl', getUrlsOpen);
routeUrls.delete('/urls/:id', deletUrls);

export default routeUrls;