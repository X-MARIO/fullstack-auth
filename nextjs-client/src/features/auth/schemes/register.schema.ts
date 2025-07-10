import {z} from "zod";

export const RegisterSchema = z.object({
    name: z.string().min(1)
})