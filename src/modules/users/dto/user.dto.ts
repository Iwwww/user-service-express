import { PublicUserSchema } from "@shared/schemas/PublicUserSchema";
import z from "zod";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export type GetUser = z.infer<typeof PublicUserSchema>;
