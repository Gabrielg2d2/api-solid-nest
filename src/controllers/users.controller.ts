import { AuthenticateUserDocs } from '@/doc/users/authenticate-user.doc';
import { CreateUserDocs } from '@/doc/users/create-user.doc';
import { ProfileUserDocs } from '@/doc/users/get-profile-user.doc';
import {
  IDataAuthenticateRequest,
  IDataCreateUserRequest,
  UsersDomain,
} from '@/domain/users/main';
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('users')
@Controller('/users')
export class UsersController {
  @Post('/create')
  @CreateUserDocs()
  async create(@Body() body: IDataCreateUserRequest, @Res() reply: Response) {
    const domain = new UsersDomain();
    const result = await domain.createUser(body);

    return reply.status(result.statusCode).send(result);
  }

  @Post('/session')
  @AuthenticateUserDocs()
  async authenticate(
    @Body() body: IDataAuthenticateRequest,
    @Res() reply: Response,
  ) {
    const domain = new UsersDomain();
    const result = await domain.authenticateUser(body);

    return reply.status(result.statusCode).send(result);
  }

  @Get('/profile/:userId')
  @ProfileUserDocs()
  async getProfile(@Param('userId') userId: string, @Res() reply: Response) {
    const domain = new UsersDomain();
    const result = await domain.getProfile({
      userId: userId,
    });

    return reply.status(result.statusCode).send(result);
  }
}
