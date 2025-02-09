export class RootException extends Error {
  private status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }

  public getStatus(): number {
    return this.status;
  }
}

export class ConflictException extends RootException {
  constructor(message: string) {
    super(message, 409);
  }
}

export class ForbiddenException extends RootException {
  constructor(message: string) {
    super(message, 403);
  }
}

export class NotFoundException extends RootException {
  constructor(message: string) {
    super(message, 404);
  }
}
