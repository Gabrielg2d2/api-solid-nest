import { FactoryUsersDomain } from '@/application/factories/users/domain';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseUsersController } from './base.controller';

@ApiTags('users')
@Controller('/users')
export class UsersController extends BaseUsersController {
  constructor() {
    super();
    this.domain = FactoryUsersDomain.create();
  }
}
