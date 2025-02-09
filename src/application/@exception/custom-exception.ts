export class CustomException extends Error {
  private status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }

  public getStatus(): number {
    return this.status;
  }
}

export class ConflictException extends CustomException {
  constructor(message: string) {
    super(message, 409);
  }
}
