import { BaseUsersController } from '@/controllers/user.controller/base.controller';
import { UsersDomain } from '@/domain/users/main';
import { RepositoryUserTest } from '@/domain/users/repositories/repository-test';
import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('doc/users')
@Controller('/users')
export class DocUsersController extends BaseUsersController {
  private repository = new RepositoryUserTest();

  constructor() {
    super();
    this.domain = new UsersDomain(this.repository);
  }
  // TODO: APENAS DOCUMENTAÇÃO - INICIO
  @Get('/clear-all-repository-in-memory')
  async clear(@Res() reply: Response) {
    const repository = this.repository;
    repository.clearAllUsers();
    return reply.status(200).send({
      message: 'All users removed',
    });
  }
  //TODO: APENAS DOCUMENTAÇÃO - FIM
}
