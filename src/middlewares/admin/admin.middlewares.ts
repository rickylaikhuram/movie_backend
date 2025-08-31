import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../../types/request.types.js";
import z from "zod";
import { movieSchema } from "../../utils/inputValidation.js";
import { AppError } from "../../utils/error.class.js";

export const movieInputValidation = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const result = movieSchema.safeParse(req.body.movieData);
  console.log(req.body.movieData)
  if (!result.success) {
    throw new AppError(
      411, // HTTP status
      "Invalid input format",
      "INVALID_INPUT", // optional error code
      z.treeifyError(result.error) // details
    );
  }
  req.body.movieData = result.data;
  next();
};
