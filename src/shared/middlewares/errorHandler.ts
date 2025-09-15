import { Request, Response, NextFunction } from "express";
import logger from "@config/logger";
import { AppError, ConflictError } from "@shared/errors/AppError";
import { ZodAny, ZodError } from "zod";

export default function (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): any {
  logger.error(err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: {
        message: err.issues[0]?.message,
        code: err.issues[0]?.code.toUpperCase(),
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

  res.status(500).json({
    error: {
      message: "Internal Server Error",
      code: "INTERNAL_ERROR",
    },
  });
  return;
}
