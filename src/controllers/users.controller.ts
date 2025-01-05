import {
  IDataAuthenticateRequest,
  IDataCreateUserRequest,
  IDataGetProfileRequest,
  UsersDomain,
} from '@/domain/users/main';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('/users')
export class UsersController {
  @Post('/create')
  async create(@Body() body: IDataCreateUserRequest) {
    const domain = new UsersDomain();
    const result = await domain.createUser(body);

    return result;
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
