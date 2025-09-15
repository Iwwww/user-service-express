export class AppError extends Error {
  status: number;
  code?: string | undefined;
  details?: unknown;

  constructor(
    message: string,
    status: number = 500,
    opts?: { code?: string; details?: unknown },
  ) {
    super(message);
    this.status = status;
    this.code = opts?.code;
    this.details = opts?.details;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad Reqeust", details?: unknown) {
    super(message, 400, { code: "BAD_REQUEST", details });
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not Found", details?: unknown) {
    super(message, 404, { code: "NOT_FOUND", details });
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflict", details?: unknown) {
    super(message, 409, { code: "CONFLICT", details });
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized", details?: unknown) {
    super(message, 401, { code: "UNAUTHORIZED", details });
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden", details?: unknown) {
    super(message, 403, { code: "FORBIDDEN", details });
  }
}
