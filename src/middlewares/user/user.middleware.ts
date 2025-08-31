import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../../types/request.types.js";
import { reviewSchema } from "../../utils/inputValidation.js";
import z from "zod";


export const reviewInputValidation = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const result = reviewSchema.safeParse(req.body.reviewData);
  if (!result.success) {
    throw {
      statusCode: 411,
      message: "Invalid input format",
      errors: z.treeifyError(result.error),
    };
  }
  req.body.reviewData = result.data;
  next();
};
