import { Prisma } from "@prisma/client";
export const errorHandler = (err, req, res, next) => {
    console.error(" Global Error:", err);
    // Optional: log stack in development
    if (process.env.NODE_ENV === "development") {
        console.error(err.stack);
    }
    if (err.name === "UnauthorizedError") {
        res.status(401).json({ message: "Invalid or expired token" });
        return;
    }
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(400).json({
            message: "Database error",
            code: err.code,
            detail: process.env.NODE_ENV === "development" ? err.meta : undefined,
        });
        return;
    }
    if (err instanceof Prisma.PrismaClientValidationError) {
        res.status(400).json({
            message: "Invalid input data for Prisma",
            detail: process.env.NODE_ENV === "development" ? err.message : undefined,
        });
        return;
    }
    res.status(err.statusCode || err.status || 500).json({
        success: false,
        errorCode: err.errorCode || undefined, // send only if present
        message: err.message || "Internal Server Error",
        details: err.details || undefined,
    });
    return;
};
//# sourceMappingURL=error.middlewares.js.map