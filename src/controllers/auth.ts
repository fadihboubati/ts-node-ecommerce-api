import {NextFunction, Request, Response} from 'express'
import { prismaClient } from '..';
import {hashSync, compareSync} from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from '../secrets';
import { BadRequestException } from '../exceptions/bad-requests';
import { ErrorCodes } from '../exceptions/root';
import {logIn as loginAuth, signUp as signUpAuth} from '../validations/auth.validation';


export const login = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;
    loginAuth.parse(req.body);

    let user = await prismaClient.user.findFirst({
        where: {
            email
        }
    });

    if (!user) {
        next(new BadRequestException("User not registered!", ErrorCodes.USER_NOT_REGISTERED));
        return;
    }

    // since we already do a strict validation, so no need for this, but will keep it for reference
    const { password: hashedUserPassword, ...userDataWithoutPassword } = user;

    if (!compareSync(password, hashedUserPassword)) {
        next(new BadRequestException("Invalid Credentials!", ErrorCodes.INVALID_CREDENTIALS));
        return;
    }

    let payload = {
        id: user.id
    }
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "1d"});

    res.json({user: userDataWithoutPassword, token});
}

export const signup = async (req: Request, res: Response, next: NextFunction) => {
        signUpAuth.parse(req.body);
        const {name, email, password} = req.body;
        let user = await prismaClient.user.findFirst({
            where: {
                email
            }
        });
        if (user) {
            next(new BadRequestException("User already exists!", ErrorCodes.USER_ALREADY_EXISTS))
        }
        user = await prismaClient.user.create({
            data: {
                name,
                email,
                password : hashSync(password, 10)
            }
        })
        res.json(user)
}