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

export class ForbiddenException extends RootError {
  constructor(message: string) {
    super(message, 403);
  }
}

export class NotFoundException extends RootError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class ConflictException extends RootError {
  constructor(message: string) {
    super(message, 409);
  }
}
