import z from "zod";

export const RefreshResponseSchema = z.object({
  data: z.object({
    accessToken: z.jwt(),
  }),
});
