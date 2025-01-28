import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ValidateHeaderMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const headerValue = req.headers['header'];

    // TODO: Implement a better validation
    if (!headerValue || headerValue !== '123') {
      throw new UnauthorizedException('Invalid or missing header');
    }

    next();
  }
}
