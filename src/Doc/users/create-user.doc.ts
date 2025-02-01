import {
  IDataCreateUserRequest,
  IDataCreateUserResponse,
} from '@/application/domains/users/main';
import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { useGenerateDoc } from '../@functions/useGenerateDoc';

const RequestCreateUser = useGenerateDoc<IDataCreateUserRequest>(
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123',
  },
  'CreateUserRequest',
);

const ResponseCreateUser = useGenerateDoc<IDataCreateUserResponse>(
  {
    user: {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: 'hashedpassword123',
      created_at: new Date(),
    },
  },
  'CreateUserResponse',
);

export function CreateUserDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Create user' }),
    ApiHeader({
      name: 'header',
      description: 'Description header',
      required: false,
    }),
    ApiBody({ type: RequestCreateUser }),
    ApiResponse({
      status: 201,
      description: 'The user has been successfully created.',
      type: ResponseCreateUser,
    }),
    ApiResponse({ status: 400, description: 'Bad Request.' }),
    ApiResponse({ status: 409, description: 'User already exists' }),
  );
}
