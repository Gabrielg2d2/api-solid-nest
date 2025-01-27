import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const SetHeader = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const headerValue = request.headers['header'] || 'default-value-123';
    const domain = request.domain;
    await domain.setHeader(headerValue);
  },
);
