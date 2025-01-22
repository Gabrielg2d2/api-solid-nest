import { applyDecorators } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function HistoryCheckInsDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'History check ins' }),
    ApiHeader({
      name: 'header',
      description: 'Description header',
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: 'fetch history check-ins successfully',
    }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
}
