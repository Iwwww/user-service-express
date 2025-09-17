import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserEntity } from "@database/entities/User";
import { RegisterData } from "./schemas/register.schema";
import { AppDataSource } from "@database/data-source";
import { ConflictError, UnauthorizedError } from "@shared/errors/AppError";
import { BCRYPT_COST } from "@config/password";
import {
  jwtAccessConfig,
  JwtAccessPayload,
  JwtConfig,
  jwtRefreshConfig,
  JwtRefreshPayload,
} from "@config/jwt";
import { LoginData } from "./schemas/login.schema";
import { GetUser } from "../users/dto/user.dto";
import { PublicUserSchema } from "@shared/schemas/PublicUserSchema";

export async function registerUser(registerData: RegisterData): Promise<{
  user: Omit<UserEntity, "passwordHash">;
  accessToken: string;
  refreshToken: string;
}> {
  const repo = AppDataSource.getRepository(UserEntity);
  const existingUser = await repo.findOneBy({
    email: registerData.email.toLowerCase(),
  });

  if (existingUser) {
    throw new ConflictError("User with this email already exists");
  }

  const passwordHash = await bcrypt.hash(registerData.password, BCRYPT_COST);

  const user = repo.create({
    email: registerData.email.toLowerCase(),
    fullName: registerData.fullName,
    birthDate: registerData.birthDate,
    passwordHash: passwordHash,
    role: registerData.role,
  });
  await repo.save(user);

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  const publicUser = PublicUserSchema.parse(user);

  return { user: publicUser, accessToken, refreshToken };
}

export async function loginUser(
  loginData: LoginData,
): Promise<{ user: GetUser; accessToken: string; refreshToken: string }> {
  const repo = AppDataSource.getRepository(UserEntity);

  const user = await repo.findOne({
    where: { email: loginData.email },
    select: {
      id: true,
      email: true,
      fullName: true,
      birthDate: true,
      passwordHash: true,
      role: true,
      isActive: true,
    },
  });

  if (!user || !user.isActive) {
    throw new UnauthorizedError("Invalid credetials");
  }

  const isValidPassword = await bcrypt.compare(
    loginData.password,
    user.passwordHash,
  );
  if (!isValidPassword) {
    throw new UnauthorizedError("Invalid credetials");
  }

  const refreshToken = generateRefreshToken(user);
  const accessToken = generateAccessToken(user);

  const publicUser = PublicUserSchema.parse(user);

  return { user: publicUser, accessToken, refreshToken };
}

export async function refreshAccessToken(
  token: string,
  refreshSecret: string,
): Promise<{ refreshToken: string; accessToken: string }> {
  const decoded = jwt.verify(token, refreshSecret, { complete: false }) as {
    id: string;
  };

  const repo = AppDataSource.getRepository(UserEntity);
  const user = await repo.findOneBy({ id: decoded.id, isActive: true });

  if (!user || !user.isActive) {
    throw new UnauthorizedError("User not found");
  }

  const refreshToken = generateRefreshToken(user);
  const accessToken = generateAccessToken(user);

  return { refreshToken, accessToken };
}

export function generateRefreshToken(user: UserEntity): string {
  const payload: JwtRefreshPayload = { id: user.id };
  return jwt.sign(payload, jwtRefreshConfig.secret, {
    expiresIn: jwtRefreshConfig.expiresIn,
    issuer: jwtRefreshConfig.issuer,
    audience: jwtRefreshConfig.audience,
  });
}

export function generateAccessToken(user: UserEntity): string {
  const payload: JwtAccessPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, jwtAccessConfig.secret, {
    expiresIn: jwtAccessConfig.expiresIn,
    issuer: jwtAccessConfig.issuer,
    audience: jwtAccessConfig.audience,
  });
}
