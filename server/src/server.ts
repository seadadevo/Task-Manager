import { ENV } from "./config/env";
import app from './app';
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(ENV.MONGO_URI);
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('Mongo Database connection error:', error);
    process.exit(1);
    }
}


const startServer = async () => {
    try {

        await connectDB();


        app.listen(ENV.PORT, () => {
            console.log(`Server running on port ${ENV.PORT}`)
        })
            } catch (error) {
        console.error('Faild to start server', error);
        process.exit(1);
    }
}

startServer()