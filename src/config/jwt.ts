import { type StringValue } from "ms";
import {
  JWT_ACCESS_TTL,
  JWT_REFRESH_TTL,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_SECRET,
} from "@shared/utils/secrets.utils";

export interface JwtConfig {
  issuer: string;
  audience: string;
  expiresIn: StringValue;
  secret: string;
}

export const jwtRefreshConfig: JwtConfig = {
  issuer: "user-service",
  audience: "user-clients",
  expiresIn: JWT_REFRESH_TTL as StringValue,
  secret: JWT_REFRESH_SECRET,
};

export const jwtAccessConfig: JwtConfig = {
  issuer: "user-service",
  audience: "user-clients",
  expiresIn: JWT_ACCESS_TTL as StringValue,
  secret: JWT_ACCESS_SECRET,
};
