import {
  IDataAuthenticateRequest,
  IDataCreateUserRequest,
  UsersDomain,
} from '@/application/domains/users/main';
import { AuthenticateUserDocs } from '@/doc/users/authenticate-user.doc';
import { CreateUserDocs } from '@/doc/users/create-user.doc';
import { ProfileUserDocs } from '@/doc/users/get-profile-user.doc';
import { Presenter } from '@/presenter';

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

    const data = await this.domain.createUser(body);

    const response = Presenter.successResponse({ user: data }, 201);

    return reply.status(response.statusCode).send(response);
  }

  @Post('/session')
  @AuthenticateUserDocs()
  async authenticate(
    @Body() body: IDataAuthenticateRequest,
    @Res() reply: Response,
  ) {
    const data = await this.domain.authenticateUser(body);

    const response = Presenter.successResponse({ user: data }, 200);

    return reply.status(response.statusCode).send(response);
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
