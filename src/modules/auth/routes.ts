import { validateRequest } from "@shared/middlewares/validateRequest";
import { Router } from "express";
import { RegisterBodySchema } from "./schemas/register.schema";
import { LoginBodySchema } from "./schemas/login.schema";
import { login, refresh, register } from "./controller";
import { RefreshBodySchema } from "./schemas/refresh.schema";

const router = Router();

router.post("/register", validateRequest(RegisterBodySchema), register);
router.post("/login", validateRequest(LoginBodySchema), login);
router.post("/refresh", validateRequest(RefreshBodySchema), refresh);

export default router;
