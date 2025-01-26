import {
  IDataAuthenticateRequest,
  IDataCreateUserRequest,
  UsersDomain,
} from '@/application/domains/users/main';
import { AuthenticateUserDocs } from '@/doc/users/authenticate-user.doc';
import { CreateUserDocs } from '@/doc/users/create-user.doc';
import { ProfileUserDocs } from '@/doc/users/get-profile-user.doc';

import { Body, Get, Headers, Param, Post } from '@nestjs/common';

export class BaseUsersController {
  protected domain!: UsersDomain;

  @Post('/create')
  @CreateUserDocs()
  async create(
    @Headers('header') headerValue = 'default-value',
    @Body() body: IDataCreateUserRequest,
  ) {
    const data = await this.domain.createUser(headerValue, body);

    return {
      user: data,
    };
  }

  @Post('/session')
  @AuthenticateUserDocs()
  async authenticate(
    @Headers('header') headerValue = 'default-value-123',
    @Body() body: IDataAuthenticateRequest,
  ) {
    await this.domain.setHeader(headerValue);
    const data = await this.domain.authenticateUser(body);

    return {
      user: data,
    };
  }

  @Get('/profile/:userId')
  @ProfileUserDocs()
  async getProfile(@Param('userId') userId: string) {
    const data = await this.domain.getProfile(userId);

    return {
      user: data,
    };
  }
}
