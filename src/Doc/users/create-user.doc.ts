import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { useGenerateDoc } from '../@functions/useGenerateDoc';

const CreateUserRequest = useGenerateDoc(
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123',
  },
  'CreateUserRequest',
);

const CreateUserResponse = useGenerateDoc(
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    password_hash: 'hashedpassword123',
    created_at: '2023-10-01T00:00:00Z',
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
    ApiBody({ type: CreateUserRequest }),
    ApiResponse({
      status: 201,
      description: 'The user has been successfully created.',
      type: CreateUserResponse,
    }),
    ApiResponse({ status: 400, description: 'Bad Request.' }),
    ApiResponse({ status: 409, description: 'User already exists' }),
  );
}
