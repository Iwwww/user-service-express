import { Request, Response, NextFunction } from "express";
import logger from "@config/logger";
import { AppError, ConflictError } from "@shared/errors/AppError";
import { ZodAny, ZodError } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";

export default function (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
): any {
  if (err instanceof SyntaxError) {
    return res.status(400).json({
      error: {
        message: err.message,
        code: "SYNTAX_ERROR",
      },
    });
  }

  if (err.type === "entity.parse.failed") {
    return res.status(err.status).json({
      error: {
        message: err.message,
        code: "SYNTAX_ERROR",
      },
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: {
        message: err.issues[0]?.message,
        code: err.issues[0]?.code.toUpperCase(),
      },
    });
  }

  if (err instanceof JsonWebTokenError) {
    return res.status(401).json({
      error: {
        message: `${err.name}: ${err.message}`,
        code: "INVALID_TOKEN",
      },
    });
  }

  if (err instanceof AppError) {
    return res.status(err.status).json({
      error: {
        message: err.message,
        code: err.code,
      },
    });
  }

  logger.error(err);
  res.status(500).json({
    error: {
      message: "Internal Server Error",
      code: "INTERNAL_ERROR",
    },
  });
  return;
}
