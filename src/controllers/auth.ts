import {NextFunction, Request, Response} from 'express'
import { prismaClient } from '..';
import {hashSync, compareSync} from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from '../secrets';
import { BadRequestException } from '../exceptions/bad-requests';
import { ErrorCodes } from '../exceptions/root';
import { unprocessableEntity } from '../exceptions/validation';
import { UserSchema } from '../schema/users';


export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    

    let user = await prismaClient.user.findFirst({
        where: {
            email
        }
    });

    if (!user) {
        throw Error("User is not registered");
    }
    const { password: hashedUserPassword, ...userDataWithoutPassword } = user;

    if (!compareSync(password, hashedUserPassword)) {
        throw Error("Invalid Credentials");
    }

    let payload = {
        id: user.id
    }
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "1d"});

    res.json({user: userDataWithoutPassword, token});
}

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        UserSchema.parse(req.body);
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
    } catch (error : any) {
        next(new unprocessableEntity(error?.issues, "Error creating user", ErrorCodes.UNPROCESSABLE_ENTITY))
    }
}