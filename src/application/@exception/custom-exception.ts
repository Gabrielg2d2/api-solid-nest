export class RootError extends Error {
  private status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }

  public getStatus(): number {
    return this.status;
  }
}

export class BadRequestError extends RootError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class UnauthorizedError extends RootError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class ForbiddenError extends RootError {
  constructor(message: string) {
    super(message, 403);
  }
}

export class NotFoundError extends RootError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class ConflictError extends RootError {
  constructor(message: string) {
    super(message, 409);
  }
}

export class InvalidContentError extends RootError {
  constructor(message: string) {
    super(message, 422);
  }
}
