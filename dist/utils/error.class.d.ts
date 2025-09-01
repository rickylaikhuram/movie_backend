export declare class AppError extends Error {
    status: number;
    errorCode?: string | undefined;
    details?: any;
    constructor(status: number, message: string, errorCode?: string, details?: any);
}
//# sourceMappingURL=error.class.d.ts.map