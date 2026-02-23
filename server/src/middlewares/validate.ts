import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';

const validate = (schema: ZodSchema) => 
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.issues.map((i: any) => i.message).join(', ');
        return next(new AppError(message, 400));
      }
      next(error);
    }
  });

export default validate;