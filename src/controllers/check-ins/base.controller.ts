import { CreateCheckInsDocs } from '@/doc/checkIns/create-check-ins';
import { CheckInDomain, IDataCreateRequest } from '@/domain/checkins/main';
import { Body, Headers, Post, Res } from '@nestjs/common';
import { Response } from 'express';

export class BaseCheckInsController {
  protected domain!: CheckInDomain;

  @Post('/create')
  @CreateCheckInsDocs()
  async create(
    @Headers('header') headerValue = 'default-value',
    @Body() body: IDataCreateRequest,
    @Res() reply: Response,
  ) {
    console.log('Header value: ', headerValue);
    const result = await this.domain.create(body);

    return reply.status(result.statusCode).send(result);
  }
}
