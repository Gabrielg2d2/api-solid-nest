import {
  IDataRequestCreateCheckIn,
  IDataResponseCreateCheckIn,
} from '@/application/domains/checkins/main';
import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { useGenerateDoc } from '../@functions/useGenerateDoc';

const RequestCreateCheckIn = useGenerateDoc<IDataRequestCreateCheckIn>(
  {
    gymId: '123',
    userId: '123123123',
    userLatitude: -6.1234,
    userLongitude: 106.1234,
  },
  'RequestCreateCheckIn',
);

const ResponseCreateCheckIn = useGenerateDoc<IDataResponseCreateCheckIn>(
  {
    id: 'string',
    gym_id: 'string',
    user_id: 'string',
    validated_at: new Date(),
    created_at: new Date(),
  },
  'ResponseCreateCheckIn',
);

export function CreateCheckInsDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Create check ins' }),
    ApiHeader({
      name: 'header',
      description: 'Description header',
      required: false,
    }),
    ApiBody({ type: RequestCreateCheckIn }),
    ApiResponse({
      status: 201,
      description: 'The check ins has been successfully created.',
      type: ResponseCreateCheckIn,
    }),
    ApiResponse({
      status: 409,
      description: 'Check-in already exists today',
    }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
}
