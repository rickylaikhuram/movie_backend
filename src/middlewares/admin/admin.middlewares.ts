import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../../types/request.types.js";
import z from "zod";
import { movieSchema } from "../../utils/inputValidation.js";


export const movieInputValidation = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const result = movieSchema.safeParse(req.body.movieData);
  if (!result.success) {
    throw {
      statusCode: 411,
      message: "Invalid input format",
      errors: z.treeifyError(result.error),
    };
  }
  req.body.movieData = result.data;
  next();
};
