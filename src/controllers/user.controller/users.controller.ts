import { UsersDomain } from '@/domain/users/main';
import { RepositoryUsers } from '@/domain/users/repositories/repository';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseUsersController } from './base.controller';

@ApiTags('users')
@Controller('/users')
export class UsersController extends BaseUsersController {
  private repository = new RepositoryUsers();

  constructor() {
    super();
    this.domain = new UsersDomain(this.repository);
  }
}
