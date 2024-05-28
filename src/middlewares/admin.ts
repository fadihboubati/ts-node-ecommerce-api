import { Request, Response, NextFunction } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCodes } from "../exceptions/root";
import { JWT_SECRET } from "../secrets";
import * as jwt from "jsonwebtoken";
import { prismaClient } from "..";
import { InternalException } from "../exceptions/internal-exception";

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.currentUser;
    if (user.role === "ADMIN") {
        next();
        return;
    } else {
        next(new UnauthorizedException('UnauthorizedException', ErrorCodes.UNAUTHORIZED));
        return;
    }
}