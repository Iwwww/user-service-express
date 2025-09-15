import { Router } from "express";
import { getUserById, getUsers, postUser } from "./controller";
import { validateRequest } from "@shared/middlewares/validateRequest";
import { GetUserParamSchema } from "./schemas/getUser.schema";
import { CreateBodyUserSchema } from "./schemas/createUser.schema";

const router: Router = Router();

router.get("/:id", validateRequest(GetUserParamSchema), getUserById);
router.get("/", getUsers);
router.post("/", validateRequest(CreateBodyUserSchema), postUser);

export default router;
