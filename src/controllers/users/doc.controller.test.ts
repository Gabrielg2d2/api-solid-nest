import { RepositoryUserTest } from '@/application/domains/users/repositories/repository-test';
import { FactoryUsersDomainTest } from '@/application/factories/users/domain.test';
import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { BaseUsersController } from './base.controller';

@ApiTags('doc/users')
@Controller('/users')
export class DocUsersController extends BaseUsersController {
  private repository = RepositoryUserTest.getInstance();

  constructor() {
    super();
    this.domain = FactoryUsersDomainTest.create();
  }
  // TODO: APENAS DOCUMENTAÇÃO - INICIO
  @Get('/clear-all-repository-in-memory')
  async clear(@Res() reply: Response) {
    const repository = this.repository;
    await repository.clearAllUsers();

    return reply.status(200).send({
      message: 'All users removed',
    });
  }

  @Get('/fetch-all-repository-in-memory')
  async fetch(@Res() reply: Response) {
    const repository = this.repository;
    const result = await repository.getAllUsers();

    return reply.status(200).send(result);
  }
  //TODO: APENAS DOCUMENTAÇÃO - FIM
}
