import { UserRole } from "src/modules/users/dto/user.dto";
import z from "zod";

export const RegisterSchema = z.object({
  fullName: z.string().min(1),
  birthDate: z.iso.date(),
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 symbols"),
  role: z.enum([UserRole.USER, UserRole.ADMIN]).default(UserRole.USER),
});
export type RegisterData = z.infer<typeof RegisterSchema>;

export const RegisterBodySchema = z.object({
  body: RegisterSchema,
});
