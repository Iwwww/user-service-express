import { Request, Response, NextFunction } from "express";
import {
  deactivateUser,
  findUserById,
  findUsers,
  activateUser,
} from "./service";
import { NotFoundError } from "@shared/errors/AppError";
import { GetUsersSchema } from "./schemas/getUsers.schema";
import { PublicUserSchema } from "@shared/schemas/PublicUserSchema";

export async function getUserById(
  req: Request<{ id: string }>,
  res: Response,
  _next: NextFunction,
): Promise<void> {
  const user = await findUserById(req.params.id);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const safe = PublicUserSchema.parse(user);
  res.json(safe);
}

export async function getUsers(
  _req: Request,
  res: Response,
  _next: NextFunction,
): Promise<void> {
  const users = await findUsers();

  const safe = GetUsersSchema.parse(users);

  res.json(safe);
}

export async function putUserBlock(
  req: Request<{ id: string }>,
  res: Response,
  _next: NextFunction,
): Promise<void> {
  await deactivateUser(req.params.id);

  res.status(204).end();
}

export async function deleteUserBlock(
  req: Request<{ id: string }>,
  res: Response,
  _next: NextFunction,
): Promise<void> {
  await activateUser(req.params.id);

  res.status(204).end();
}
