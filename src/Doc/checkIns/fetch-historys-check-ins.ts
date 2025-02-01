import { IDataResponseFetchHistoryCheckIns } from '@/application/domains/checkins/main';
import { applyDecorators } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { useGenerateDoc } from '../@functions/useGenerateDoc';

const ResponseHistoryCheckIns =
  useGenerateDoc<IDataResponseFetchHistoryCheckIns>(
    [
      {
        id: '1',
        gym_id: 'string',
        user_id: 'string',
        validated_at: new Date(),
        created_at: new Date(),
      },
    ],
    'ResponseHistoryCheckIns',
  );

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
      type: ResponseHistoryCheckIns,
    }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
}
