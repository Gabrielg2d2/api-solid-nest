import {
  IDataAuthenticateRequest,
  IDataCreateUserRequest,
  UsersDomain,
} from '@/domain/users/main';
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';

export function createDto<T extends object>(type: T) {
  class DynamicDto {
    constructor() {
      Object.keys(type).forEach((key) => {
        this[key] = type[key];
      });
    }
  }

  Object.keys(type).forEach((key) => {
    ApiProperty({ example: type[key] })(DynamicDto.prototype, key);
  });

  Object.keys(type).forEach((key) => {
    ApiProperty({ type: String })(DynamicDto.prototype, key);
  });

  return DynamicDto;
}

const CreateUserDto = createDto<IDataCreateUserRequest>({
  name: 'Name Test',
  email: 'test@gmail.com',
  password: '123456',
});

@ApiTags('users')
@Controller('/users')
export class UsersController {
  @Post('/create')
  @ApiOperation({ summary: 'Create user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() body: IDataCreateUserRequest, @Res() reply: Response) {
    const domain = new UsersDomain();
    const result = await domain.createUser(body);

    return reply.status(result.statusCode).send(result);
  }

  @Post('/session')
  @ApiOperation({ summary: 'Authenticate user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully authenticated.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
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
