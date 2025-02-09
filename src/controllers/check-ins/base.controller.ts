import {
  CheckInDomain,
  IDataRequestCreateCheckIn,
} from '@/application/domains/checkins/main';
import { CreateCheckInsDocs } from '@/doc/checkIns/create-check-ins';
import { HistoryCheckInsDocs } from '@/doc/checkIns/fetch-historys-check-ins';
import { Body, Get, Headers, Param, Post } from '@nestjs/common';

export class BaseCheckInsController {
  protected domain!: CheckInDomain;

  @Post('/create')
  @CreateCheckInsDocs()
  async create(
    @Headers('header') headerValue = 'default-value',
    @Body() body: IDataRequestCreateCheckIn,
  ) {
    console.log('Header value: ', headerValue);
    return await this.domain.create(body);
  }

  @Get('/history-check-ins/:userId')
  @HistoryCheckInsDocs()
  async fetchHistoryCheckIns(@Param('userId') userId: string) {
    return await this.domain.fetchHistoryCheckIns(userId);
  }
}
