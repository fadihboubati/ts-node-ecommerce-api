import { Request, Response, NextFunction } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCodes } from "../exceptions/root";
import { Policy } from "@prisma/client";

export const authorize  = (requiredRoles: string[], requiredPolicies: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const user = req.currentUser;           
        
        if (!user) {
            next(new UnauthorizedException('Unauthorized', ErrorCodes.UNAUTHORIZED));
            return;
        }

        // Check if the user's role is in the list of required roles
        const userRole = user.role?.name;
        if (!userRole || !requiredRoles.includes(userRole)) {
            next(new UnauthorizedException('Unauthorized', ErrorCodes.UNAUTHORIZED));
            return;
        }
    
        // Check if the user has all the required policies
        const userPolicies = user?.role?.policies || [];
        const hasPermission = requiredPolicies.every(policy => userPolicies.includes(policy as Policy));

        if (!hasPermission) {
            next(new UnauthorizedException('Unauthorized', ErrorCodes.UNAUTHORIZED));
            return;
        }
    
        next();
    }   
}

