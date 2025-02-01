import { RepositoryUserTest } from '@/application/domains/users/repositories/doc';
import { FactoryUsersDomainDoc } from '@/application/factories/users/doc';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseUsersController } from './base.controller';

@ApiTags('doc/users')
@Controller('/users')
export class DocUsersController extends BaseUsersController {
  private repository = RepositoryUserTest.getInstance();

  constructor() {
    super();
    this.domain = FactoryUsersDomainDoc.create();
  }
}
