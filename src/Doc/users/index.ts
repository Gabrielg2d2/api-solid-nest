import {
  IDataAuthenticateRequest,
  IDataCreateUserRequest,
} from '@/domain/users/main';
import { useGenerateDtoDoc } from '../functions/generateDtoDoc';

export const CreateUserDto = useGenerateDtoDoc<IDataCreateUserRequest>(
  {
    name: 'Name Test',
    email: 'test@gmail.com',
    password: '123456',
  },
  'CreateUserDto',
);

export const AuthenticateUserDto = useGenerateDtoDoc<IDataAuthenticateRequest>(
  { email: 'test@gmail.com', password: '123456' },
  'AuthenticateUserDto',
);
