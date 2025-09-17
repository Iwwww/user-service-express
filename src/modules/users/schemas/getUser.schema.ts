import z from "zod";

export const GetUserParamSchema = z.object({
  params: z.object({
    id: z.uuid(),
  }),
});
