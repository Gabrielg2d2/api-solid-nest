import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(message: string, status: HttpStatus) {
    super(message, status);
  }

  public getStatus(): number {
    return super.getStatus();
  }
}
