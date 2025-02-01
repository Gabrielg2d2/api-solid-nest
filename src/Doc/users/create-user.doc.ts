import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiProperty,
  ApiResponse,
} from '@nestjs/swagger';

class CreateUserRequest {
  @ApiProperty({ example: 'John Doe' })
  name!: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  email!: string;

  @ApiProperty({ example: 'password123' })
  password!: string;
}

class CreateUserResponse {
  @ApiProperty({ example: '1' })
  id!: string;

  @ApiProperty({ example: 'John Doe' })
  name!: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  email!: string;

  @ApiProperty({ example: 'hashedpassword123' })
  password_hash!: string;

  @ApiProperty({ example: '2023-10-01T00:00:00Z' })
  created_at!: string;
}

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
