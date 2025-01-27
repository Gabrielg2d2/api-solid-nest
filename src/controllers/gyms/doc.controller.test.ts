import { RepositoryGymsTest } from '@/application/domains/gyms/repositories/repository-test';
import { FactoryGymsDomainTest } from '@/application/factories/Gyms/domain.test';
import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { BaseGymsController } from './base.controller';

@ApiTags('doc/gyms')
@Controller('/gyms')
export class DocGymsController extends BaseGymsController {
  private repository = RepositoryGymsTest.getInstance();

  constructor() {
    super();
    this.domain = FactoryGymsDomainTest.create();
  }

  // TODO: APENAS DOCUMENTAÇÃO - INICIO

  @Get('/auxiliary-route-fetch-all-gyms')
  async fetch(@Res() reply: Response) {
    const repository = this.repository;
    const result = await repository.getAllGyms();

    return reply.status(200).send(result);
  }
  //TODO: APENAS DOCUMENTAÇÃO - FIM
}
