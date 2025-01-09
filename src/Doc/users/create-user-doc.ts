import { IDataCreateUserRequest } from '@/domain/users/main';
import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { useGenerateDoc } from '../functions/generateDtoDoc';

const CreateUserDto = useGenerateDoc<IDataCreateUserRequest>(
  {
    name: 'Name Test',
    email: 'test@gmail.com',
    password: '123456',
  },
  'CreateUserDto',
);

export function CreateUserDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Create user' }),
    ApiBody({ type: CreateUserDto }),
    ApiResponse({
      status: 201,
      description: 'The user has been successfully created.',
    }),
    ApiResponse({ status: 400, description: 'Bad Request.' }),
    ApiResponse({ status: 409, description: 'User already exists' }),
  );
}
