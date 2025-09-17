import dotenv from "dotenv";
import { defaultTo } from "lodash";
import path from "path";

dotenv.config({ path: ".env" });

export const ENVIRONMENT = defaultTo(process.env.APP_ENV, "dev");
export const IS_PRODUCTION = ENVIRONMENT === "production";
export const APP_PORT = defaultTo(parseInt(process.env.APP_PORT ?? ""), 3000);
export const ALLOWED_ORIGINS_CORS = (
  defaultTo(process.env.ALLOWED_ORIGINS_CORS, "") as string
)
  .split(",")
  .map((s) => s.trim()) || ["localhost", "127.0.0.1"];
export const LOG_LEVEL = defaultTo(process.env.APP_LOG_LEVEL, "info");
export const LOG_DIRECTORY = defaultTo(
  process.env.APP_LOG_DIRECTORY,
  path.resolve("logs"),
);
export const JWT_ACCESS_SECRET = defaultTo(
  process.env.JWT_ACCESS_SECRET,
  "jwt_access_secret-at-least-256-bits-long",
);
export const JWT_REFRESH_SECRET = defaultTo(
  process.env.JWT_REFRESH_SECRET,
  "jwt_refresh_secret-at-least-256-bits-long",
);
export const JWT_ACCESS_TTL = defaultTo(process.env.JWT_ACCESS_TTL, "2m");
export const JWT_REFRESH_TTL = defaultTo(process.env.JWT_REFRESH_TTL, "7d");
export const DB = {
  USER: defaultTo(process.env.DB_USER, "root"),
  PASSWORD: defaultTo(process.env.DB_PASSWORD, "password"),
  HOST: defaultTo(process.env.DB_HOST, "localhost"),
  NAME: defaultTo(process.env.DB_NAME, "users"),
  PORT: parseInt(defaultTo(process.env.DB_PORT, "")) || 5432,
};
