import { IRepositoryUsers } from './repositories/interface';
import {
  AuthenticateUserUseCase,
  IDataRequest as IDataAuthenticateRequest,
  IDataResponse as IDataAuthenticateResponse,
  IReturnAuthenticateUser,
} from './use-cases/authenticate-user/main';
import {
  CreateUserUseCase,
  IDataRequest as IDataCreateUserRequest,
  IDataResponse as IDataCreateUserResponse,
  IReturnCreateUserUseCase,
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
  IDataCreateUserRequest,
  IDataCreateUserResponse,
  IDataGetProfileRequest,
  IDataGetProfileResponse,
};

interface IUsersDomain {
  createUser(
    header: string,
    body: IDataCreateUserRequest,
  ): IReturnCreateUserUseCase;
  authenticateUser(body: IDataAuthenticateRequest): IReturnAuthenticateUser;
  getProfile(userId: string): IReturnDefaultGetProfile;
}

export class UsersDomain implements IUsersDomain {
  constructor(private readonly repository: IRepositoryUsers) {}

  async setHeader(header: string) {
    await this.repository.setHeader(header);
  }

  async createUser(header: string, body: IDataCreateUserRequest) {
    await this.repository.setHeader(header);
    return await new CreateUserUseCase(this.repository).execute(body);
  }

  async authenticateUser(body: IDataAuthenticateRequest) {
    return await new AuthenticateUserUseCase(this.repository).execute(body);
  }

  async getProfile(userId: string) {
    return await new GetProfileUseCase(this.repository).execute(userId);
  }
}
