// import { Role } from '@prisma/client';
import { z } from 'zod';

export const logIn = z.object({
    body: z.object({
        email: z.string().email({message: "Invalid email"}).max(100),
        password: z.string({
            required_error: "Password is required", 
            invalid_type_error: "Password must be a string",
            message: "Password must be at least 8 characters long",
        }).max(8)
    }).strict(),
}).strict({
    message: "Params and Queries are not allowed. Only the 'body' object is allowed."
});

export const signUp = z.object({
    body: z.object({
        name: z.string().max(100),
        email: z.string().email({message: "Invalid email"}).max(100),
        password: z.string({
            required_error: "Password is required", 
            invalid_type_error: "Password must be a string",
            message: "Password must be at least 8 characters long",
        }).max(8),
    }).strict(),
    // role: z.nativeEnum(Role, {required_error: "Role is required"})
    
}).strict({
    message: "Params and Queries are not allowed. Only the 'body' object is allowed."
});

