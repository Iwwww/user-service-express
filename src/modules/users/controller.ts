import { Request, Response, NextFunction } from "express";
import { createUser, findUserById } from "./service";
import { GetUserSchema } from "./dto/user.dto";
import { CreateUser, CreateUserSchema } from "./schemas/createUser.schema";

export async function getUserById(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const user = await findUserById(req.params.id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      // return;
    }

    const safe = GetUserSchema.parse(user);
    res.json(safe);
  } catch (err) {
    next(err);
  }
}

export async function postUser(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const user: CreateUser = CreateUserSchema.parse(req.body);
    const created = await createUser(user);

    const safe = GetUserSchema.parse(created);

    res.status(201).json(safe);
  } catch (err) {
    next(err);
  }
}
