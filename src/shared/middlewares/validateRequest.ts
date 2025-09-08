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
      if (err instanceof ZodError) {
        return res.status(409).send({ message: err.issues[0]?.message });
      }

      return res.status(500).send(err);
    }
  };
