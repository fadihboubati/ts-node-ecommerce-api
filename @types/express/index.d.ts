import { User, Policy, Role } from "@prisma/client";

export interface UserWithRole {
    userId: number;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    roleId: number | null;
    role: {
        name: string;
        policies: Policy[];
    } | null;
}

declare global{
    namespace Express {
        interface Request {
            currentUser?: UserWithRole // the ? mark means optional
        }
    }
}
