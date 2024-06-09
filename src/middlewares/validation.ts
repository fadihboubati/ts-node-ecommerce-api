import {ZodError, ZodSchema} from 'zod';
import { Request, Response, NextFunction } from 'express';
import { InternalException } from '../exceptions/internal-exception';
import { ErrorCodes } from '../exceptions/root';

export const validate = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.reqData);
        next();
    } catch (error: any) {
        let exception;
        if (error instanceof ZodError) {
            let er = new ZodError(error.errors);
            exception = new InternalException("Validation error" ,ErrorCodes.INTERNAL_EXCEPTION, er);                

        } else {
            exception = new InternalException("Internal server error" ,ErrorCodes.INTERNAL_EXCEPTION, error?.message || error);                
        }
        next(exception);
    }
}