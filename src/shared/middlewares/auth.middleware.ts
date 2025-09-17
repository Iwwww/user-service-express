import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwtAccessConfig } from "@config/jwt";
import { UserEntity } from "@database/entities/User";
import { UnauthorizedError } from "@shared/errors/AppError";
import { AppDataSource } from "@database/data-source";

export interface AuthenticatedRequest extends Request {
  user?: UserEntity;
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : null;

    if (!token) {
      throw new UnauthorizedError("Access token required");
    }

    const decoded = jwt.verify(token, jwtAccessConfig.secret) as {
      id: string;
      email: string;
      role: string;
    };

    const repo = AppDataSource.getRepository(UserEntity);
    const user = await repo.findOne({
      where: { id: decoded.id, isActive: true },
    });

    if (!user) {
      throw new UnauthorizedError("Invalid credentials");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
