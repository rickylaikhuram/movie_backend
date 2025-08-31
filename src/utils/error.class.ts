export class AppError extends Error {
  status: number;
  errorCode?: string | undefined;
  details?: any;

  constructor(
    status: number,
    message: string,
    errorCode?: string,
    details?: any
  ) {
    super(message);
    this.status = status;
    this.errorCode = errorCode;
    this.details = details;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
}
