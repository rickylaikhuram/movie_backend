export class AppError extends Error {
    status;
    errorCode;
    details;
    constructor(status, message, errorCode, details) {
        super(message);
        this.status = status;
        this.errorCode = errorCode;
        this.details = details;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AppError);
        }
    }
}
//# sourceMappingURL=error.class.js.map