import type { Response, NextFunction } from "express";
import dotenv from "dotenv";
import type { AuthRequest } from "../../types/request.types.js";
import { decodeToken, verifyToken } from "../../utils/tokens.js";
import { createGuestTokens } from "../../utils/guest.js";
import { signIn, signUp } from "../../utils/inputValidation.js";
import { z } from "zod";
import { AppError } from "../../utils/error.class.js";

dotenv.config();

// Middleware: Check if user is authenticated or create guest identity
export const identifySessionUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // Check both cookie and Authorization header
  let authHeader = req.headers.authorization;
  let token;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7); // Remove 'Bearer ' prefix
  }

  try {
    if (!token) throw new Error("No token");

    const decoded = verifyToken(token); // Will throw if invalid or expired
    req.user = decoded;
    req.token = token; // Store the existing valid token
    return next(); // Proceed with valid user
  } catch (err: any) {
    try {
      const guestToken = createGuestTokens();
      let guestDecoded;
      try {
        guestDecoded = decodeToken(guestToken);
      } catch (decodeErr) {
        console.error("Failed to decode new guest token:", decodeErr);
        throw new AppError(500, "Internal server error");
      }
      req.user = guestDecoded;
      req.token = guestToken; // Store the new guest token
      return next();
    } catch (guestErr) {
      console.error("Guest token creation failed:", guestErr);
      throw new AppError(500, "Internal server error");
    }
  }
};

//check if the user is admin
export const isAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || !req.user.isAdmin) {
    throw new AppError(403, "Admin access only");
  }
  next();
};

//check if the user is a user
export const isUser = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    throw new AppError(403, "Unauthorized");
  }

  if (req.user.role !== "user") {
    throw new AppError(403, "Only user access allowed");
  }

  next();
};

// user signup input validation
export const signUpInputValidation = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const result = signUp.safeParse(req.body.signUpData);
  if (!result.success) {
    throw new AppError(
      411, // HTTP status
      "Invalid input format",
      "INVALID_INPUT", // optional error code
      z.treeifyError(result.error) // details
    );
  }
  req.body.signUpData = result.data;
  next();
};

// user signin input validation
export const signInInputValidation = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const result = signIn.safeParse(req.body.signInData);
  if (!result.success) {
    throw new AppError(
      411, // HTTP status
      "Invalid input format",
      "INVALID_INPUT", // optional error code
      z.treeifyError(result.error) // details
    );
  }
  next();
};
