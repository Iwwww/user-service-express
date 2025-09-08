import { Router } from "express";
import { getUserById, postUser } from "./controller";
import { validateRequest } from "@shared/middlewares/validateRequest";
import { GetUserParamSchema } from "./schemas/getUser.schema";
import { CreateBodyUserSchema } from "./schemas/createUser.schema";

const router: Router = Router();

router.get("/:id", validateRequest(GetUserParamSchema), getUserById);
router.post("/", validateRequest(CreateBodyUserSchema), postUser);

export default router;
