import { NextFunction, Request, Response } from "express";
import { ErrorCodes, HttpException } from "../exceptions/root";
import { InternalException } from "../exceptions/internal-exception";
import { ZodError } from "zod";
import { BadRequestException } from "../exceptions/bad-requests";

export const errorHandler = (method: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await method(req, res, next)
        } catch (error: any) {
            let exception : HttpException;
            if (error instanceof HttpException) {
                exception = error;
            } else {
                if (error instanceof ZodError) {
                    exception = new BadRequestException("Bad Request", ErrorCodes.UNPROCESSABLE_ENTITY, error?.message || error); 
                } else {
                    exception = new InternalException("Internal server error" ,ErrorCodes.INTERNAL_EXCEPTION, error?.message || error);                
                }
            }
            next(exception);
        }
    }
}