import type { Response } from "express";
import type { AuthRequest } from "../types/request.types.js";
export declare const responseUser: (req: AuthRequest, res: Response) => void;
export declare const handleSignUp: (req: AuthRequest, res: Response) => Promise<void>;
export declare const handleSignIn: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=auth.controller.d.ts.map