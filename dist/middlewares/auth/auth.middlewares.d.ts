import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../../types/request.types.js";
export declare const identifySessionUser: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const isAdmin: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const isUser: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const signUpInputValidation: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const signInInputValidation: (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.middlewares.d.ts.map