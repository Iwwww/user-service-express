import z from "zod";

export const BlockUserParamSchema = z.object({
  params: z.object({
    id: z.uuid(),
  }),
});
