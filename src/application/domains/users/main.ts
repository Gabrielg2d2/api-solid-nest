import { IRepositoryUsers } from './repositories/interface';
import {
  AuthenticateUserUseCase,
  IDataRequest as IDataAuthenticateRequest,
  IDataResponse as IDataAuthenticateResponse,
  IReturnAuthenticateUser,
} from './use-cases/authenticate-user/main';
import {
  CreateUserUseCase,
  IReturnCreateUserUseCase,
  TRequestCreateUser,
  TResponseCreateUser,
} from './use-cases/create-user/main';
import {
  GetProfileUseCase,
  IDataRequest as IDataGetProfileRequest,
  IDataResponse as IDataGetProfileResponse,
  IReturnDefaultGetProfile,
} from './use-cases/get-user-profile/main';

export type {
  IDataAuthenticateRequest,
  IDataAuthenticateResponse,
  IDataGetProfileRequest,
  IDataGetProfileResponse,
  TRequestCreateUser,
  TResponseCreateUser,
};

interface IUsersDomain {
  createUser(body: TRequestCreateUser): IReturnCreateUserUseCase;
  authenticateUser(body: IDataAuthenticateRequest): IReturnAuthenticateUser;
  getProfile(userId: string): IReturnDefaultGetProfile;
}

export class UsersDomain implements IUsersDomain {
  constructor(private readonly repository: IRepositoryUsers) {}

  async createUser(body: TRequestCreateUser) {
    return await new CreateUserUseCase(this.repository).execute(body);
  }

  async authenticateUser(body: IDataAuthenticateRequest) {
    return await new AuthenticateUserUseCase(this.repository).execute(body);
  }

  async getProfile(userId: string) {
    return await new GetProfileUseCase(this.repository).execute(userId);
  }
}
