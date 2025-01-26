import {
  IDataAuthenticateRequest,
  IDataCreateUserRequest,
  UsersDomain,
} from '@/application/domains/users/main';
import { AuthenticateUserDocs } from '@/doc/users/authenticate-user.doc';
import { CreateUserDocs } from '@/doc/users/create-user.doc';
import { ProfileUserDocs } from '@/doc/users/get-profile-user.doc';

import { Body, Get, Headers, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';

export class BaseUsersController {
  protected domain!: UsersDomain;

  @Post('/create')
  @CreateUserDocs()
  async create(
    @Headers('header') headerValue = 'default-value',
    @Body() body: IDataCreateUserRequest,
  ) {
    console.log('Header value: ', headerValue);

    return await this.domain.createUser(body);
  }

  @Post('/session')
  @AuthenticateUserDocs()
  async authenticate(
    @Body() body: IDataAuthenticateRequest,
    @Res() reply: Response,
  ) {
    const data = await this.domain.authenticateUser(body);

    return reply.send(data);
  }

  @Get('/profile/:userId')
  @ProfileUserDocs()
  async getProfile(@Param('userId') userId: string) {
    return await this.domain.getProfile(userId);
  }
}
