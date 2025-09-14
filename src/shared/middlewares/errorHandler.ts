import { Request, Response, NextFunction } from "express";
import logger from "@config/logger";

export default function (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  logger.error(err);
  res.status(err?.status ?? 500);
  res.send(err?.message ?? "Something went wrong");
  return;
}
