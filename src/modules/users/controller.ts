import { Request, Response, NextFunction } from "express";
import { createUser, findUserById } from "./service";
import { GetUserSchema } from "./dto/user.dto";
import { CreateUser, CreateUserSchema } from "./schemas/createUser.schema";
import { NotFoundError } from "@shared/errors/AppError";

export async function getUserById(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const user = await findUserById(req.params.id);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const safe = GetUserSchema.parse(user);
  res.json(safe);
}

export async function postUser(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const user: CreateUser = CreateUserSchema.parse(req.body);
  const created = await createUser(user);

  const safe = GetUserSchema.parse(created);

  res.status(201).json(safe);
}
