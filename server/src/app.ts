import express, { Application } from "express";
import helmet from "helmet";
import cors from 'cors';
import { ENV } from "./config/env";
import cookieParser from "cookie-parser";


const app: Application = express();

app.use(helmet());

app.use(
    cors({
        origin: ENV.CLIENT_URL,
        credentials: true,
    })
)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


export default app;