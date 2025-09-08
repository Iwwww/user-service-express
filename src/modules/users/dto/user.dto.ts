import z from "zod";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

// export const UserBaseSchema = z.object({
//   body: z.object({
//     id: z.string(),
//     fullName: z.string().min(1),
//     birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
//     email: z.email(),
//     role: z.enum([UserRole.USER, UserRole.ADMIN]),
//     isActive: z.boolean(),
//   }),
// });
// export type UserBase = z.infer<typeof UserBaseSchema>;

export const GetUserSchema = z.object({
  id: z.string(),
  fullName: z.string().min(1),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  email: z.email(),
  role: z.enum([UserRole.USER, UserRole.ADMIN]),
  isActive: z.boolean(),
});
export type GetUser = z.infer<typeof GetUserSchema>;
