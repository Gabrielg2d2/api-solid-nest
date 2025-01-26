import { IRepositoryUsers } from './repositories/interface';
import {
  AuthenticateUserUseCase,
  IDataRequest as IDataAuthenticateRequest,
  IReturnAuthenticateUser,
} from './use-cases/authenticate-user/main';
import {
  CreateUserUseCase,
  IDataRequest as IDataCreateUserRequest,
  IReturnCreateUserUseCase,
} from './use-cases/create-user/main';
import {
  GetProfileUseCase,
  IReturnDefaultGetProfile,
} from './use-cases/get-user-profile/main';

export type { IDataAuthenticateRequest, IDataCreateUserRequest };

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
