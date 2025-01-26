import { applyDecorators } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ProfileUserDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Get user profile' }),
    ApiHeader({
      name: 'header',
      description: 'Description header',
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: 'User found successfully',
    }),
    ApiResponse({ status: 404, description: 'User not found.' }),
  );
}
