import { IReturnDefaultDomainGlobal } from '@/application/@global/types/return-default-domain';
import { IUserGlobal } from '@/application/@global/types/user';
import { IRepositoryUsers } from '../../repositories/interface';
import { ServiceValidatingAuthenticatedUser } from '../../services/validatiing-authenticated-user';
import { ServiceValidationEmailPassword } from '../../services/validating-email-password';
import { ErrorsAuthenticateUser } from './returns/errors';
import { SuccessAuthenticateUser } from './returns/success';

type IDataRequest = {
  email: string;
  password: string;
};

type IDataResponse = {
  user: IUserGlobal;
};

type IReturnAuthenticateUser = Promise<
  IReturnDefaultDomainGlobal<{
    user: IUserGlobal;
  } | null>
>;

export type { IDataRequest, IDataResponse, IReturnAuthenticateUser };

interface IAuthenticateUserUseCase {
  execute(body: IDataRequest): IReturnAuthenticateUser;
}
export class AuthenticateUserUseCase implements IAuthenticateUserUseCase {
  constructor(private readonly repository: IRepositoryUsers) {}

  async execute(body: IDataRequest) {
    try {
      const { email, password } = body;

      await new ServiceValidationEmailPassword().execute(email, password);

      const user = await this.repository.getUserByEmail(email);

      await new ServiceValidatingAuthenticatedUser().execute(user, password);

      return await new SuccessAuthenticateUser().execute({ user });
    } catch (error) {
      return await new ErrorsAuthenticateUser().execute(error);
    }
  }
}
