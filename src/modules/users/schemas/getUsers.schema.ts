import z from "zod";
import { PublicUserSchema } from "@shared/schemas/PublicUserSchema";

export const GetUsersSchema = z.array(PublicUserSchema);
