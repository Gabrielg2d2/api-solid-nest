import { IDataCreateUserRequest } from '@/application/domains/users/main';
import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { useGenerateDoc } from '../@functions/useGenerateDoc';

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
    ApiHeader({
      name: 'header',
      description: 'Description header',
      required: false,
    }),
    ApiBody({ type: CreateUserDto }),
    ApiResponse({
      status: 201,
      description: 'The user has been successfully created.',
    }),
    ApiResponse({ status: 400, description: 'Bad Request.' }),
    ApiResponse({ status: 409, description: 'User already exists' }),
  );
}
