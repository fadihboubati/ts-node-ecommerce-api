import { Request, Response, NextFunction } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCodes } from "../exceptions/root";
import { JWT_SECRET } from "../secrets";
import * as jwt from "jsonwebtoken";
import { prismaClient } from "..";
import { InternalException } from "../exceptions/internal-exception";
import { UserWithRole } from "../../@types/express";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    // 1. extract token from header
    const token = req.headers.authorization?.split(" ")[1];

    // 2. if the token is not present, then throw an error if unauthorized
    if (!token) {
        next(new UnauthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED));
        return
    }
    try {
        // 3. if the token is present, then verify the token and extract the payload
        const payload = jwt.verify(token, JWT_SECRET) as any
    
        // 4. to get the user from the payload
        const user = await prismaClient.user.findUnique({
            where: {
                userId: payload.userId
            },
            include : {
                role: {
                    select: {
                        name: true,
                        policies: true
                    }
                }
            }
        })
    
        if (!user) {
            next(new UnauthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED));
        } 
        
        
        // 5. attach the user to the current request object    
        const { password, ...userWithoutPassword } = user as UserWithRole & { password: string };


        // 6. Attach the user without the password to the request object
        req.currentUser = userWithoutPassword

        next();
    } catch (error) {
        next(new InternalException("Internal Server Error", ErrorCodes.INTERNAL_EXCEPTION, error));
    }
}