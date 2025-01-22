import { IDataRequest } from '@/application/domains/gyms/main';
import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { useGenerateDoc } from '../@functions/useGenerateDoc';

const CreateGymsDto = useGenerateDoc<IDataRequest>(
  {
    title: 'CreateGymsDto',
    description: 'Data for create gyms',
    latitude: -6.1234,
    longitude: 106.1234,
    phone: '08123456789',
  },
  'CreateGymsDto',
);

export function CreateGymsDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Create check ins' }),
    ApiHeader({
      name: 'header',
      description: 'Description header',
      required: false,
    }),
    ApiBody({ type: CreateGymsDto }),
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
