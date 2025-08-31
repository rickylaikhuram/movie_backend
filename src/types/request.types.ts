import type { Request } from "express";
import type { User } from "@prisma/client";

export interface DecodedToken {
  uid: string;
  role: "admin" | "guest" | "user";
  isAdmin: boolean;
  iat?: number;
  exp?: number;
}

export interface UserExtend extends Request {
  user?: User;
}

export interface AuthRequest extends Request {
  user?: DecodedToken;
  userData?: User;
  token?:string
}
