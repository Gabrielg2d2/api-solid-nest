import {
  IDataAuthenticateRequest,
  IDataCreateUserRequest,
} from '@/domain/users/main';
import { useGenerateDoc } from '../functions/generateDtoDoc';

export const CreateUserDto = useGenerateDoc<IDataCreateUserRequest>(
  {
    name: 'Name Test',
    email: 'test@gmail.com',
    password: '123456',
  },
  'CreateUserDto',
);

export const AuthenticateUserDto = useGenerateDoc<IDataAuthenticateRequest>(
  { email: 'test@gmail.com', password: '123456' },
  'AuthenticateUserDto',
);
