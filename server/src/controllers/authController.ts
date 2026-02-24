import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";
import User from "../models/User";
import bcrypt from "bcryptjs";

const cookieOps = {
    httpOnly: true,
    secure: ENV.NODE_ENV === 'production',
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
}


export const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {name, email, password, passwordConfirm , photo} = req.body;
    
    if (!name || !email || !password || !passwordConfirm) {
        return next(new AppError('Please provide all required fields', 400));
    }

    const newUser = await User.create({
        name, 
        email,
        password,
        passwordConfirm,
        photo   
    })

    const accessToken = jwt.sign(
        {id: newUser._id} ,
        ENV.ACCESS_TOKEN_SECRET ,
        {expiresIn: '1d'} ,
    ) 

    const refreshToken = jwt.sign(
        {id: newUser._id} ,
        ENV.REFRESH_TOKEN_SECRET ,
        {expiresIn: '7d'} ,
    ) 

    res.cookie('jwt', refreshToken, cookieOps);

    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        accessToken,
        data: {
            id: newUser._id,
            name,
            email,
            photo
        }
    })
})


export const login = catchAsync(async (req: Request, res: Response , next: NextFunction) => {
    const {email ,password}   = req.body;

    if(!email || !password) {
        return next(new AppError( 'Please provide email and password!' , 400))
    }
    
    const user = await User.findOne({email}).select('+password');

    const isPasswordCorrect = user ?  await bcrypt.compare( password , user.password) : false;
    
    if(!user || !isPasswordCorrect)  {
        return next(new AppError( 'Incorrect Email or Password' , 401));
    }

    const accessToken = jwt.sign(
        {id: user._id},
        ENV.ACCESS_TOKEN_SECRET,
        {expiresIn: '1d'}
    )

    const refreshToken = jwt.sign(
        {id: user._id},
        ENV.REFRESH_TOKEN_SECRET,
        {expiresIn: '7d'}
    )

     res.cookie('jwt', refreshToken, cookieOps);

    res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        accessToken,
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
            photo: user.photo
        }
    })
})


export const refresh = catchAsync(async (req: Request, res: Response , next: NextFunction) => {
    const refreshToken = req.cookies.jwt;

    if(!refreshToken) {
        return next(new AppError('You are not logged in! Please log in to get access' , 401))
    }

    try {
        const decoded = jwt.verify(refreshToken , ENV.REFRESH_TOKEN_SECRET) as { id: string };
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return next(new AppError('The user belonging to this token no longer exists', 401));
        }

        const accessToken = jwt.sign(
        {id: currentUser._id},
        ENV.ACCESS_TOKEN_SECRET,
        {expiresIn: '1d'}
    )
     
    res.status(200).json({
        success: true,
        message: 'Access token refreshed successfully',
        accessToken,
        data: {
            id: currentUser._id,
            name: currentUser.name,
            email: currentUser.email,
            photo: currentUser.photo
        }
    })
    } catch (error) {
        return next(new AppError('Invalid token', 401));
    }

    
})


export const logout = catchAsync(async (req: Request, res: Response , next: NextFunction) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    })
    res.status(200).json({
        success: true,
        message: 'User logged out successfully'
    })
})


export const getMe = catchAsync(async (req: Request, res: Response , next: NextFunction) => {
    res.status(200).json({
        success: true,
        data: {
            user: req.user
        }
    })
})