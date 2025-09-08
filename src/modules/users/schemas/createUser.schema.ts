import z from "zod";
import { UserRole } from "../dto/user.dto";

export const CreateUserSchema = z.object({
  fullName: z.string().min(1),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 symbols"),
  role: z.enum([UserRole.USER, UserRole.ADMIN]),
});
export type CreateUser = z.infer<typeof CreateUserSchema>;

export const CreateBodyUserSchema = z.object({
  body: z.object({
    CreateUserSchema,
  }),
});
