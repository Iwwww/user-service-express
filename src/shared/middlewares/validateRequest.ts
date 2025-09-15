import { ZodError, ZodType } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateRequest =
  (schema: ZodType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (err) {
      next(err);
    }
  };
