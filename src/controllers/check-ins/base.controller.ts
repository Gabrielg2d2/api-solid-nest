import {
  CheckInDomain,
  IDataCreateRequest,
} from '@/application/domains/checkins/main';
import { CreateCheckInsDocs } from '@/doc/checkIns/create-check-ins';
import { HistoryCheckInsDocs } from '@/doc/checkIns/fetch-historys-check-ins';
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
    const data = await this.domain.create(body);

    return reply.send(data);
  }

  @Get('/history-check-ins/:userId')
  @HistoryCheckInsDocs()
  async fetchHistoryCheckIns(
    @Param('userId') userId: string,
    @Res() reply: Response,
  ) {
    const data = await this.domain.fetchHistoryCheckIns(userId);

    return reply.send(data);
  }
}
