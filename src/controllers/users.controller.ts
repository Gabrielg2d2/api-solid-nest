import { AuthenticateUserDocs } from '@/doc/users/authenticate-user.doc';
import { CreateUserDocs } from '@/doc/users/create-user.doc';
import {
  IDataAuthenticateRequest,
  IDataCreateUserRequest,
  UsersDomain,
} from '@/domain/users/main';
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: 200,
    description: 'The user profile has been successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getProfile(@Param('userId') userId: string, @Res() reply: Response) {
    const domain = new UsersDomain();
    const result = await domain.getProfile({
      userId: userId,
    });

    return reply.status(result.statusCode).send(result);
  }
}
