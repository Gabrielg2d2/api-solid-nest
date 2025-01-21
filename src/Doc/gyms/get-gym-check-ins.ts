import { applyDecorators } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function GetGymsDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Get gym by id' }),
    ApiHeader({
      name: 'header',
      description: 'Description header',
      required: false,
    }),
    ApiResponse({
      status: 404,
      description: 'Gym not found',
    }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
}
