import { z } from 'zod'

export const getProductsByUser = z.object({
    params: z.object({
        id: z.string()
    }).strict()
}).strict({
    message: "Body and Queries are not allowed. Only the 'params' object is allowed."
})