import { IDataAuthenticateRequest } from '@/application/domains/users/main';
import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { useGenerateDoc } from '../@functions/useGenerateDoc';

const RequestAuthenticate = useGenerateDoc<IDataAuthenticateRequest>(
  {
    email: 'test@gmail.com',
    password: '123456',
  },
  'AuthenticateUserDto',
);

export function AuthenticateUserDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Authenticate user' }),
    ApiHeader({
      name: 'header',
      description: 'Description header',
      required: false,
    }),
    ApiBody({ type: RequestAuthenticate }),
    ApiResponse({
      status: 200,
      description: 'User authenticated successfully',
    }),
    ApiResponse({ status: 400, description: 'Credentials are invalid.' }),
  );
}
