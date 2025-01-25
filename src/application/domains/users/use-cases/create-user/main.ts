import { IUserGlobal } from '@/application/@global/types/user';
import { IRepositoryUsers } from '../../repositories/interface';
import { ServiceCreatePasswordHash } from '../../services/create-password-hash';
import { ServiceValidationUserAlreadyExists } from '../../services/validating-user-alredy-exists';
import { ServiceValidationCreateUser } from '../../services/validation-user-creation';

type IDataRequest = {
  name: string;
  email: string;
  password: string;
};

type IDataResponse = IUserGlobal;

type IReturnCreateUserUseCase = Promise<IDataResponse | null>;

export type { IDataRequest, IDataResponse, IReturnCreateUserUseCase };

interface ICreateUserUseCase {
  execute(body: IDataRequest): Promise<IDataResponse | null>;
}

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private readonly repository: IRepositoryUsers) {}

  async execute(body: IDataRequest) {
    await new ServiceValidationCreateUser().execute(body);

    const { name, email, password } = body;

    const user = await this.repository.getUserByEmail(email);

    await new ServiceValidationUserAlreadyExists().execute(user);

    const password_hash = await new ServiceCreatePasswordHash().execute(
      password,
    );

    const newUser = await this.repository.createUser({
      name,
      email,
      password: password_hash,
    });

    return newUser;
  }
}
