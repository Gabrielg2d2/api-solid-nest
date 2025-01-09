import { IDataAuthenticateRequest } from '@/domain/users/main';
import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { useGenerateDoc } from '../functions/useGenerateDoc';

const AuthenticateUserDto = useGenerateDoc<IDataAuthenticateRequest>(
  {
    email: 'test@gmail.com',
    password: '123456',
  },
  'AuthenticateUserDto',
);

export function AuthenticateUserDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Authenticate user' }),
    ApiBody({ type: AuthenticateUserDto }),
    ApiResponse({
      status: 200,
      description: 'User authenticated successfully',
    }),
    ApiResponse({ status: 400, description: 'Credentials are invalid.' }),
  );
}
