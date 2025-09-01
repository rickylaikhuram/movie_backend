import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../types/request.types.js";
export declare const getUserProfile: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const updateUserName: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const updateUserEmail: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const createReview: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getReview: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const handleToggleWatchlist: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getWatchlist: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getWatchlistIds: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=user.controller.d.ts.map