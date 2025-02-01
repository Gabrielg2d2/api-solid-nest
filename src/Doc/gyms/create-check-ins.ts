import {
  IDataRequestCreateGym,
  IDataResponseCreateGym,
} from '@/application/domains/gyms/main';
import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { useGenerateDoc } from '../@functions/useGenerateDoc';

const RequestCreateGyms = useGenerateDoc<IDataRequestCreateGym>(
  {
    title: 'Gym Data',
    description: 'Data for create gyms',
    latitude: -6.1234,
    longitude: 106.1234,
    phone: '08123456789',
  },
  'RequestCreateGyms',
);

const ResponseCreateGyms = useGenerateDoc<IDataResponseCreateGym>(
  {
    id: '123456',
    title: 'CreateGymsDto',
    description: 'Data for create gyms',
    latitude: -6.1234,
    longitude: 106.1234,
    phone: '08123456789',
    created_at: new Date(),
  },
  'ResponseCreateGyms',
);

export function CreateGymsDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Create check ins' }),
    ApiHeader({
      name: 'header',
      description: 'Description header',
      required: false,
    }),
    ApiBody({ type: RequestCreateGyms }),
    ApiResponse({
      status: 201,
      description: 'The check ins has been successfully created.',
      type: ResponseCreateGyms,
    }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
}
