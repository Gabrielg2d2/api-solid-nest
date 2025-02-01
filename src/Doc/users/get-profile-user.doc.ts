import { IDataGetProfileResponse } from '@/application/domains/users/main';
import { applyDecorators } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { useGenerateDoc } from '../@functions/useGenerateDoc';

const ResponseGetProfile = useGenerateDoc<IDataGetProfileResponse>(
  {
    id: '123123123',
    name: 'Test User',
    email: 'test@gmail.com',
    password_hash: '$2a$06$NKPokWEEG6Zz5zZz5zZz5u',
    created_at: new Date(),
  },
  'ResponseGetProfile',
);

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
      type: ResponseGetProfile,
    }),
    ApiResponse({ status: 404, description: 'User not found.' }),
  );
}
