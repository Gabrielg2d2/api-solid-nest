import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ProfileUserDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Get user profile' }),
    ApiResponse({
      status: 200,
      description: 'User found successfully',
    }),
    ApiResponse({ status: 404, description: 'User not found.' }),
  );
}
