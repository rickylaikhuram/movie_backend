import type { Request } from "express";

interface User {
  id: string;
  name: string;
  email: string;
  profileUrl?: string;
  createdAt: Date;
}

export interface DecodedToken {
  uid: string;
  role: "admin" | "guest" | "user";
  isAdmin: boolean;
  iat?: number;
  exp?: number;
}

export interface AuthRequest extends Request {
  user?: DecodedToken;
  userData?: User;
  token?: string;
}
