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

function generateDto<T extends object>(type: T, dtoName: string) {
  const DynamicDto = class {
    constructor() {
      Object.keys(type).forEach((key) => {
        this[key] = type[key];
      });
    }
  };

  Object.defineProperty(DynamicDto, 'name', { value: dtoName });

  Object.keys(type).forEach((key) => {
    const propertyType =
      typeof type[key] === 'object' && type[key] !== null
        ? generateDto(type[key], `${dtoName} => ${key}`)
        : type[key].constructor;

    ApiProperty({
      example: type[key],
      type: propertyType,
    })(DynamicDto.prototype, key);
  });

  return DynamicDto;
}

const CreateUserDto = generateDto<IDataCreateUserRequest>(
  {
    name: 'Name Test',
    email: 'test@gmail.com',
    password: '123456',
  },
  'CreateUserDto',
);

const AuthenticateUserDto = generateDto<IDataAuthenticateRequest>(
  { email: 'test@gmail.com', password: '123456' },
  'AuthenticateUserDto',
);

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
  @ApiResponse({ status: 409, description: 'User already exists' })
  async create(@Body() body: IDataCreateUserRequest, @Res() reply: Response) {
    const domain = new UsersDomain();
    const result = await domain.createUser(body);

    return reply.status(result.statusCode).send(result);
  }

  @Post('/session')
  @ApiOperation({ summary: 'Authenticate user' })
  @ApiBody({ type: AuthenticateUserDto })
  @ApiResponse({
    status: 200,
    description: 'User authenticated successfully',
  })
  @ApiResponse({ status: 400, description: 'Credentials are invalid.' })
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
