import {
  CheckInDomain,
  IDataRequestCreateCheckIn,
} from '@/application/domains/checkins/main';
import { CreateCheckInsDocs } from '@/doc/checkIns/create-check-ins';
import { HistoryCheckInsDocs } from '@/doc/checkIns/fetch-historys-check-ins';
import { Body, Get, Param, Post } from '@nestjs/common';

export class BaseCheckInsController {
  protected domain!: CheckInDomain;

  @Post('/create')
  @CreateCheckInsDocs()
  async create(@Body() body: IDataRequestCreateCheckIn) {
    return await this.domain.create(body);
  }

  @Get('/history-check-ins/:userId')
  @HistoryCheckInsDocs()
  async fetchHistoryCheckIns(@Param('userId') userId: string) {
    return await this.domain.fetchHistoryCheckIns(userId);
  }
}
