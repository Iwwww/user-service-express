import z from "zod";

export const UnblockUserParamSchema = z.object({
  params: z.object({
    id: z.uuid(),
  }),
});
