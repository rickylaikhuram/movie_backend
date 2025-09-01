import { type JwtPayload, type SignOptions } from "jsonwebtoken";
import type { DecodedToken } from "../types/request.types.js";
export declare const generateToken: (data: JwtPayload, expiresIn: SignOptions["expiresIn"]) => string;
export declare const verifyToken: (token: string) => DecodedToken;
export declare const decodeToken: (token: string) => DecodedToken;
//# sourceMappingURL=tokens.d.ts.map