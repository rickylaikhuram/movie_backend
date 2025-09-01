import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../types/request.types.js";
export declare const handleAddMovie: (req: AuthRequest, res: Response) => Promise<void>;
export declare const handleUpdateMovie: (req: AuthRequest, res: Response) => Promise<void>;
export declare const handleDeleteMovie: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getAllUser: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getUserDetails: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=admin.controller.d.ts.map