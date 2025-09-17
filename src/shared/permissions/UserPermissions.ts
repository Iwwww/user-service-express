import { UserRole } from "src/modules/users/dto/user.dto";
import { BasePermission, PermissionContext } from "./permissions";
import logger from "@config/logger";

export class IsAdmin extends BasePermission {
  static check(context: PermissionContext): boolean {
    logger.debug("checking IsAdmin permission");
    const { user } = context;
    if (user.role === UserRole.ADMIN) return true;
    return false;
  }
}

export class IsSelfOrAdmin extends BasePermission {
  static check(context: PermissionContext): boolean {
    logger.debug("checking IsAdmin permission");
    const { user, resourceId } = context;
    if (user.role === UserRole.ADMIN) return true;
    return user.id === resourceId;
  }
}
