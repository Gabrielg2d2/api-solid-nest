import {
  TRequestCreateUser,
  TResponseCreateUser,
} from '@/application/domains/users/main';
import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { useGenerateDoc } from '../@functions/useGenerateDoc';

const RequestCreateUser = useGenerateDoc<TRequestCreateUser>(
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123',
  },
  'TRequestCreateUser',
);

const ResponseCreateUser = useGenerateDoc<TResponseCreateUser>(
  {
    user: {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: 'hashedpassword123',
      created_at: new Date(),
    },
  },
  'TResponseCreateUser',
);

export function CreateUserDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Create user', operationId: 'createUser' }),
    ApiBody({ type: RequestCreateUser }),
    ApiResponse({
      status: 201,
      description: 'The user has been successfully created.',
      type: ResponseCreateUser,
    }),
    ApiResponse({ status: 400, description: 'Bad Request.' }),
    ApiResponse({ status: 409, description: 'User already exists' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}
