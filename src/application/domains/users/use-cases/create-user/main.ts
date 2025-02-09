import { IUserGlobal } from '@/application/@global/types/user';
import { IRepositoryUsers } from '../../repositories/interface';
import { ServiceCreatePasswordHash } from '../../services/create-password-hash';
import { ServiceValidationUserAlreadyExists } from '../../services/validating-user-alredy-exists';
import { ServiceValidationCreateUser } from '../../services/validation-user-creation';

type TRequestCreateUser = {
  name: string;
  email: string;
  password: string;
};

type TResponseCreateUser = {
  user: IUserGlobal;
};

type IReturnCreateUserUseCase = Promise<TResponseCreateUser>;

export type {
  IReturnCreateUserUseCase,
  TRequestCreateUser,
  TResponseCreateUser,
};

interface ICreateUserUseCase {
  execute(body: TRequestCreateUser): Promise<TResponseCreateUser>;
}

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private readonly repository: IRepositoryUsers) {}

  async execute(body: TRequestCreateUser) {
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

    return {
      user: newUser,
    };
  }
}
