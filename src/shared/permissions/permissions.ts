import logger from "@config/logger";
import { UserEntity } from "@database/entities/User";
import { ForbiddenError } from "@shared/errors/AppError";
import { Request, Response, NextFunction } from "express";

export interface PermissionContext {
  user: UserEntity;
  resourceId: string | undefined;
  request: Request;
}

export abstract class BasePermission {
  static check(context: PermissionContext): boolean {
    return true;
  }
}

export const requirePermissions =
  (permissions: (typeof BasePermission)[]) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    logger.debug("middleware requirePermisions");
    const user = (req as any).user;

    if (!user) {
      throw new ForbiddenError("Authentication required");
    }

    const context: PermissionContext = {
      user,
      resourceId: req.params.id,
      request: req,
    };

    for (const p of permissions) {
      logger.debug("running in permission for loop");
      if (!p.check(context)) {
        throw new ForbiddenError("Insufficient permissions");
      }
    }

    next();
  };
