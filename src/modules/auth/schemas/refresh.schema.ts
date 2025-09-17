import z from "zod";

export const RefreshSchema = z.object({
  refreshToken: z.jwt(),
});

export const RefreshBodySchema = z.object({
  body: RefreshSchema,
});

export const RefreshResponseSchema = z.object({
  data: z.object({
    accessToken: z.jwt(),
    refreshToken: z.jwt(),
  }),
});
