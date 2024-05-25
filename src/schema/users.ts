//////////////////////////////
// THIS FILE NOT USED SO FAR
//////////////////////////////
import { z } from 'zod';

export const UserSchema = z.object({
    name: z.string().max(100),
    email: z.string().email({message: "Invalid email"}).max(100),
    password: z.string({
        required_error: "Password is required", 
        invalid_type_error: "Password must be a string",
        message: "Password must be at least 8 characters long",
    }).max(8)
}).strict();