import z from "zod";

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type LoginData = z.infer<typeof LoginSchema>;

export const LoginBodySchema = z.object({
  body: LoginSchema,
});
