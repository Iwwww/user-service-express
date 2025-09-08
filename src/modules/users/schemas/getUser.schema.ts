import z from "zod";
import { UserRole } from "../dto/user.dto";

export const GetUserSchema = z.object({
  id: z.string(),
  fullName: z.string().min(1),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  email: z.email(),
  role: z.enum([UserRole.USER, UserRole.ADMIN]),
  isActive: z.boolean(),
});
export const GetUserParamSchema = z.object({
  params: z.object({
    id: z.uuid(),
  }),
});
