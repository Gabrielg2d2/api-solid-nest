import { IDataCreateRequest } from '@/application/domains/checkins/main';
import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { useGenerateDoc } from '../@functions/useGenerateDoc';

const CreateCheckInsDto = useGenerateDoc<IDataCreateRequest>(
  {
    gymId: '123',
    userId: '123123123',
    userLatitude: -6.1234,
    userLongitude: 106.1234,
  },
  'CreateCheckInsDto',
);

export function CreateCheckInsDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Create check ins' }),
    ApiHeader({
      name: 'header',
      description: 'Description header',
      required: false,
    }),
    ApiBody({ type: CreateCheckInsDto }),
    ApiResponse({
      status: 201,
      description: 'The check ins has been successfully created.',
    }),
    ApiResponse({
      status: 201,
      description: 'The check ins has been successfully created.',
    }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
}
