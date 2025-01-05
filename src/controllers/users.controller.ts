import {
  IDataAuthenticateRequest,
  IDataCreateUserRequest,
  IDataGetProfileRequest,
  UsersDomain,
} from '@/domain/users/main';
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('/users')
export class UsersController {
  @Post('/create')
  async create(@Body() body: IDataCreateUserRequest, @Res() reply: Response) {
    const domain = new UsersDomain();
    const result = await domain.createUser(body);

    return reply.status(result.statusCode).send(result);
  }

  @Post('/session')
  async authenticate(@Body() body: IDataAuthenticateRequest) {
    const domain = new UsersDomain();
    const result = await domain.authenticateUser(body);

    return result;
  }

  @Get('/profile/:userId')
  async getProfile(@Param('userId') params: IDataGetProfileRequest) {
    const domain = new UsersDomain();
    const result = await domain.getProfile({
      userId: params.userId,
    });

    return result;
  }
}
