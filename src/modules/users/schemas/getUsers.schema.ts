import z from "zod";
import { GetUserSchema } from "./getUser.schema";

export const GetUsersSchema = z.array(GetUserSchema);
