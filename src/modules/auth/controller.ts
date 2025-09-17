import { Request, Response, NextFunction } from "express";
import { RegisterSchema } from "./schemas/register.schema";
import { loginUser, refreshAccessToken, registerUser } from "./service";
import { IS_PRODUCTION } from "@shared/utils/secrets.utils";
import { jwtRefreshConfig } from "@config/jwt";
import ms from "ms";
import { LoginSchema } from "./schemas/login.schema";
import { UnauthorizedError } from "@shared/errors/AppError";
import { RefreshResponseSchema } from "./schemas/refresh.schema";

export async function register(
  req: Request,
  res: Response,
  _next: NextFunction,
): Promise<void> {
  const registerData = RegisterSchema.parse(req.body);

  const { user, accessToken, refreshToken } = await registerUser(registerData);

  setRefreshToken(res, refreshToken);

  res.status(201).json({
    message: "User registred successfully",
    data: { user, accessToken },
  });
}

export async function login(
  req: Request,
  res: Response,
  _next: NextFunction,
): Promise<void> {
  const loginData = LoginSchema.parse(req.body);

  const { user, accessToken, refreshToken } = await loginUser(loginData);

  setRefreshToken(res, refreshToken);

  res.status(200).json({
    message: "Login successful",
    data: {
      user,
      accessToken,
    },
  });
}

export async function refresh(
  req: Request,
  res: Response,
  _next: NextFunction,
): Promise<void> {
  const refreshCookieToken = getRefreshToken(req);
  const { accessToken, refreshToken } = await refreshAccessToken(
    refreshCookieToken,
    jwtRefreshConfig.secret,
  );

  setRefreshToken(res, refreshToken);

  const safe = RefreshResponseSchema.parse({
    data: { accessToken: accessToken },
  });
  res.status(200).json(safe);
}

function setRefreshToken(res: Response, token: string) {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: ms(jwtRefreshConfig.expiresIn),
  });
}

function getRefreshToken(req: Request): string {
  const refresh = req.cookies.refreshToken;
  if (!refresh) throw new UnauthorizedError("No refresh token");

  return refresh;
}
