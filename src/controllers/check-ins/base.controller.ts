import {
  CheckInDomain,
  IDataCreateRequest,
} from '@/application/domains/checkins/main';
import { CreateCheckInsDocs } from '@/doc/checkIns/create-check-ins';
import { Body, Get, Headers, Param, Post, Res } from '@nestjs/common';
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

  @Get('/history-check-ins/:userId')
  async fetchHistoryCheckIns(
    @Param('userId') userId: string,
    @Res() reply: Response,
  ) {
    const result = await this.domain.fetchHistoryCheckIns(userId);

    return reply.status(result.statusCode).send(result);
  }
}
