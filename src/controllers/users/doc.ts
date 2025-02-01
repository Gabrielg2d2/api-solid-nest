import { FactoryUsersDomainDoc } from '@/application/factories/users/doc';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseUsersController } from './base.controller';

@ApiTags('doc/users')
@Controller('/users')
export class DocUsersController extends BaseUsersController {
  constructor() {
    super();
    this.domain = FactoryUsersDomainDoc.create();
  }
}
