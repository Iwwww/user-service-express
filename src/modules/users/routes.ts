import { Router } from "express";
import {
  getUserById,
  getUsers,
  putUserBlock,
  deleteUserBlock,
} from "./controller";
import { validateRequest } from "@shared/middlewares/validateRequest";
import { GetUserParamSchema } from "./schemas/getUser.schema";
import { BlockUserParamSchema } from "./schemas/blockUser.schema";
import { authenticateToken } from "@shared/middlewares/auth.middleware";
import { IsAdmin, IsSelfOrAdmin } from "@shared/permissions/UserPermissions";
import { requirePermissions } from "@shared/permissions/permissions";

const router: Router = Router();

router.use(authenticateToken);

router.get(
  "/:id",
  validateRequest(GetUserParamSchema),
  requirePermissions([IsSelfOrAdmin]),
  getUserById,
);
router.get("/", requirePermissions([IsAdmin]), getUsers);
router.put(
  "/:id/block",
  validateRequest(BlockUserParamSchema),
  requirePermissions([IsSelfOrAdmin]),
  putUserBlock,
);
router.delete(
  "/:id/block",
  validateRequest(BlockUserParamSchema),
  requirePermissions([IsAdmin]),
  deleteUserBlock,
);

export default router;
