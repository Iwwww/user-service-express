import { Router } from "express";
import {
  getUserById,
  getUsers,
  putUserBlock,
  postUser,
  deleteUserBlock,
} from "./controller";
import { validateRequest } from "@shared/middlewares/validateRequest";
import { GetUserParamSchema } from "./schemas/getUser.schema";
import { CreateBodyUserSchema } from "./schemas/createUser.schema";
import { BlockUserParamSchema } from "./schemas/blockUser.schema";

const router: Router = Router();

router.get("/:id", validateRequest(GetUserParamSchema), getUserById);
router.get("/", getUsers);
router.post("/", validateRequest(CreateBodyUserSchema), postUser);
router.put("/:id/block", validateRequest(BlockUserParamSchema), putUserBlock);
router.delete(
  "/:id/block",
  validateRequest(BlockUserParamSchema),
  deleteUserBlock,
);

export default router;
