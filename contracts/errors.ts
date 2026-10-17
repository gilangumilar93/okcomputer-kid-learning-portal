export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const Errors = {
  unauthorized: (message = "Unauthorized") => new AppError(message, 401, "UNAUTHORIZED"),
  forbidden: (message = "Forbidden") => new AppError(message, 403, "FORBIDDEN"),
  notFound: (message = "Not found") => new AppError(message, 404, "NOT_FOUND"),
  badRequest: (message = "Bad request") => new AppError(message, 400, "BAD_REQUEST"),
};
