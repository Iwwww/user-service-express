import { UserRole } from "src/modules/users/dto/user.dto";
import z from "zod";

export const PublicUserSchema = z.object({
  id: z.string(),
  fullName: z.string().min(1),
  birthDate: z.iso.date(),
  email: z.email(),
  role: z.enum([UserRole.USER, UserRole.ADMIN]),
  isActive: z.boolean(),
});
