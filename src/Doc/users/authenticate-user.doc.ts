import {
  IDataAuthenticateRequest,
  IDataAuthenticateResponse,
} from '@/application/domains/users/main';
import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { useGenerateDoc } from '../@functions/useGenerateDoc';

const RequestAuthenticate = useGenerateDoc<IDataAuthenticateRequest>(
  {
    email: 'test@gmail.com',
    password: '123456',
  },
  'RequestAuthenticate',
);

const ResponseAuthenticate = useGenerateDoc<IDataAuthenticateResponse>(
  {
    user: {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      created_at: new Date(),
      password_hash: 'password_hash15615961',
    },
  },
  'ResponseAuthenticate',
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
      type: ResponseAuthenticate,
    }),
    ApiResponse({ status: 400, description: 'Credentials are invalid.' }),
  );
}
