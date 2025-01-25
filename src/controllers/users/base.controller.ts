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
    @Res() reply: Response,
  ) {
    console.log('Header value: ', headerValue);

    const result = await this.domain.createUser(body);
    return reply.send(result);
  }

  @Post('/session')
  @AuthenticateUserDocs()
  async authenticate(
    @Body() body: IDataAuthenticateRequest,
    @Res() reply: Response,
  ) {
    const result = await this.domain.authenticateUser(body);

    return reply.status(result.statusCode).send(result);
  }

  @Get('/profile/:userId')
  @ProfileUserDocs()
  async getProfile(@Param('userId') userId: string, @Res() reply: Response) {
    const result = await this.domain.getProfile({
      userId: userId,
    });

    return reply.status(result.statusCode).send(result);
  }
}
