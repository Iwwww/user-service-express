import { Request, Response, NextFunction } from "express";
import {
  deactivateUser,
  createUser,
  findUserById,
  findUsers,
  activateUser,
} from "./service";
import { GetUserSchema } from "./dto/user.dto";
import { CreateUser, CreateUserSchema } from "./schemas/createUser.schema";
import { NotFoundError } from "@shared/errors/AppError";
import { GetUsersSchema } from "./schemas/getUsers.schema";

export async function getUserById(
  req: Request<{ id: string }>,
  res: Response,
  _next: NextFunction,
): Promise<void> {
  const user = await findUserById(req.params.id);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const safe = GetUserSchema.parse(user);
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

export async function postUser(
  req: Request,
  res: Response,
  _next: NextFunction,
): Promise<void> {
  const user: CreateUser = CreateUserSchema.parse(req.body);
  const created = await createUser(user);

  const safe = GetUserSchema.parse(created);

  res.status(201).json(safe);
}

export async function putUserBlock(
  req: Request<{ id: string }>,
  res: Response,
  _next: NextFunction,
): Promise<void> {
  await deactivateUser(req.params.id);

  res.status(204).json("User blocked");
}

export async function deleteUserBlock(
  req: Request<{ id: string }>,
  res: Response,
  _next: NextFunction,
): Promise<void> {
  await activateUser(req.params.id);

  res.status(204).json("User unblocked");
}
