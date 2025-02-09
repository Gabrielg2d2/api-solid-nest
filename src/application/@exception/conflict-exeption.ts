import { RootException } from './@root-exception';

export class ConflictException extends RootException {
  constructor(message: string) {
    super(message, 409);
  }
}
