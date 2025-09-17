import { Request, Response, NextFunction } from "express";
import { RegisterSchema } from "./schemas/register.schema";
import { loginUser, refreshAccessToken, registerUser } from "./service";
import { jwtRefreshConfig } from "@config/jwt";
import { LoginSchema } from "./schemas/login.schema";
import { RefreshResponseSchema, RefreshSchema } from "./schemas/refresh.schema";

export async function register(
  req: Request,
  res: Response,
  _next: NextFunction,
): Promise<void> {
  const registerData = RegisterSchema.parse(req.body);

  const { user, accessToken, refreshToken } = await registerUser(registerData);

  res.status(201).json({
    message: "User registred successfully",
    data: { user, accessToken, refreshToken },
  });
}

export async function login(
  req: Request,
  res: Response,
  _next: NextFunction,
): Promise<void> {
  const loginData = LoginSchema.parse(req.body);

  const { user, accessToken, refreshToken } = await loginUser(loginData);

  res.status(200).json({
    message: "Login successful",
    data: {
      user,
      accessToken,
      refreshToken,
    },
  });
}

export async function refresh(
  req: Request,
  res: Response,
  _next: NextFunction,
): Promise<void> {
  const token = RefreshSchema.parse(req.body).refreshToken;
  const { accessToken, refreshToken } = await refreshAccessToken(
    token,
    jwtRefreshConfig.secret,
  );

  const safe = RefreshResponseSchema.parse({
    data: { accessToken, refreshToken },
  });
  res.status(200).json(safe);
}
