import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";
import User from "../models/User";

export const isAuthenticated = catchAsync(async (req: Request, res: Response , next: NextFunction) => {
   
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } 
    else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return next(new AppError('You are not logged in! ', 401));
    }    
    const decoded = jwt.verify(token, ENV.ACCESS_TOKEN_SECRET) as { id: string };
    
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(new AppError('The user belonging to this token no longer exists', 401));
    }

    req.user = currentUser;
    next();
});