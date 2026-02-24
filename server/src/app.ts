import express, { Application } from "express";
import helmet from "helmet";
import cors from 'cors';
import { ENV } from "./config/env";
import cookieParser from "cookie-parser";
import { globalHandleError } from "./middlewares/errorMiddleware";
import authRoutes from "./routes/authRoutes";
import "./types"; 


const app: Application = express();

app.use(helmet());

app.use(
    cors({
        origin: ENV.CLIENT_URL,
        credentials: true,
    })
)

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1/auth' , authRoutes)


app.use(globalHandleError)

export default app;