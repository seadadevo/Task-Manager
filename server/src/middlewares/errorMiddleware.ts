import { NextFunction, Request, Response } from "express";
import { ENV } from "../config/env";
import AppError from "../utils/appError";

const handleCastErrorDB = (err: any) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
}
const handleDuplicateFieldsDB = (err: any) => {
    const value = Object.values(err.keyValue)[0];
    const message = `Duplicate field value: ${value}`;
    return new AppError(message, 400);
}
const handleValidationErrorDB = (err: any) => {
    const errors = Object.values(err.errors).map((error: any) => error.message);
    const message = `Invalid input data: ${errors.join(', ')}`;
    return new AppError(message, 400);
}
const handleJWTError = (err: any) => {
    const message = `Invalid token. Please log in again!`;
    return new AppError(message, 401);
}
const handleJWTExpiredError = (err: any) => {
    const message = `Your token has expired! Please log in again.`;
    return new AppError(message, 401);
}


export const globalHandleError = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
  
    if(ENV.NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            stack: err.stack,
            error: err,
            success: false,
            timestamp: new Date().toISOString(),
        });
    } else if (ENV.NODE_ENV === 'production') {
        let error = {...err , message: err.message , name: err.name };

        if(error.name === 'CastError') error = handleCastErrorDB(error);
        if(error.code === 11000) error = handleDuplicateFieldsDB(error);
        if(error.name === 'ValidationError') error = handleValidationErrorDB(error);
        if(error.name === 'JsonWebTokenError') error = handleJWTError(error);
        if(error.name === 'TokenExpiredError') error = handleJWTExpiredError(error);
        
        if(error.isOperational) {
            return res.status(error.statusCode).json({
                status: error.status,
                message: error.message,
                success: false,
                timestamp: new Date().toISOString(),
            });
        } else {
            console.error(err);
            return res.status(500).json({
                status: 'error',
                message: 'Something went wrong',
                success: false,
                timestamp: new Date().toISOString(),
            });
        }
    }
}