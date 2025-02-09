import { ConflictException } from '@/application/@exception/@root-exception';
import { IUserGlobal } from '@/application/@global/types/user';

interface IServiceValidationUserAlreadyExists {
  execute(user: IUserGlobal | null): Promise<void>;
}

export class ServiceValidationUserAlreadyExists
  implements IServiceValidationUserAlreadyExists
{
  async execute(user: IUserGlobal | null) {
    if (user) {
      throw new ConflictException('User already exists');
    }
  }
}
