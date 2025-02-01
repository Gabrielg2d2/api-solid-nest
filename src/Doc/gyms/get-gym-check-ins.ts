import { IDataResponseFindGym } from '@/application/domains/gyms/main';
import { applyDecorators } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { useGenerateDoc } from '../@functions/useGenerateDoc';

const ResponseGetGymCheckIns = useGenerateDoc<IDataResponseFindGym>(
  {
    id: 'ResponseGetGymCheckIns',
    latitude: 0,
    longitude: 0,
    title: 'string',
    created_at: new Date(),
    description: 'string',
    phone: 'string',
  },
  'ResponseGetGymCheckIns',
);

export function GetGymsDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Get gym by id' }),
    ApiHeader({
      name: 'header',
      description: 'Description header',
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: 'Return gym by id',
      type: ResponseGetGymCheckIns,
    }),
    ApiResponse({
      status: 404,
      description: 'Gym not found',
    }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
}
