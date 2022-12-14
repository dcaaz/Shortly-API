import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import routeUser from "./routes/userRoute.js";
import routeUrls from "./routes/urlsRoute.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(routeUser);
app.use(routeUrls);


const port = 5000;
app.listen(port, () => console.log(`Server running in port in ${port}`))