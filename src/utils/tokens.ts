import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
import type { DecodedToken } from "../types/request.types.js";
import { AppError } from "./error.class.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

// Generate token
export const generateToken = (
  data: JwtPayload,
  expiresIn: SignOptions["expiresIn"]
): string => {
  if (!JWT_SECRET || JWT_SECRET.length < 32) {
    throw new AppError(
      500,
      "JWT_SECRET_INVALID",
      "Invalid JWT_SECRET: Must be defined in environment variables and at least 32 characters long"
    );
  }

  if (!expiresIn) {
    throw new AppError(500, "TOKEN_EXPIRATION_MISSING", "Expiration time (expiresIn) is required");
  }

  const options: SignOptions = {
    expiresIn,
    algorithm: "HS256",
  };

  return jwt.sign(data, JWT_SECRET, options);
};

// Verify token
export const verifyToken = (token: string): DecodedToken => {
  if (!JWT_SECRET) {
    throw new AppError(500, "JWT_SECRET_MISSING", "JWT_SECRET is not defined");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded !== "object" || !("uid" in decoded)) {
      throw new AppError(401, "TOKEN_INVALID", "Token structure invalid");
    }

    return decoded as DecodedToken;
  } catch (error) {
    console.error("Token verification error:", error);
    throw new AppError(401, "TOKEN_INVALID", "Invalid or expired token");
  }
};

// Decode token without verification
export const decodeToken = (token: string): DecodedToken => {
  const decoded = jwt.decode(token);

  if (
    !decoded ||
    typeof decoded !== "object" ||
    !("uid" in decoded) ||
    !("role" in decoded)
  ) {
    throw new AppError(401, "TOKEN_DECODE_INVALID", "Invalid or malformed token payload");
  }

  return decoded as DecodedToken;
};
