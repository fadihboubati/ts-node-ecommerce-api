import {Request, Response} from 'express'
import { prismaClient } from '..';
import {hashSync, compareSync} from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from '../secrets';


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

export const signup = async (req: Request, res: Response) => {
    const {name, email, password} = req.body;
    

    let user = await prismaClient.user.findFirst({
        where: {
            email
        }
    });

    if (user) {
        throw Error("User is already registered");
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