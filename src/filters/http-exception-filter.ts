import { RootException } from '@/application/@exception/@root-exception';
import { Presenter } from '@/presenter';
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof RootException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof RootException
        ? exception.message
        : 'Internal server error';

    // TODO: Implement a better logging system here
    this.logger.error(
      `HTTP Status: ${status} Error Message: ${message}`,
      exception instanceof Error ? exception.stack : '',
    );

    const errorResponse = Presenter.errorResponse(
      message,
      new Date().toISOString(),
      request.url,
      exception instanceof BadRequestException
        ? exception.getResponse()
        : undefined,
    );

    response.status(status).json(errorResponse);
  }
}
