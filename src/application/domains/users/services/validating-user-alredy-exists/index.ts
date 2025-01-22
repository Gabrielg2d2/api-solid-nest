import { CustomErrorGlobal } from '@/application/@global/class/errors/custom';
import { IUserGlobal } from '@/application/@global/types/user';

interface IServiceValidationUserAlreadyExists {
  execute(user: IUserGlobal | null): Promise<void>;
}

export class ServiceValidationUserAlreadyExists
  implements IServiceValidationUserAlreadyExists
{
  async execute(user: IUserGlobal | null) {
    if (user) {
      throw new CustomErrorGlobal({
        message: 'Error: User already exists',
      });
    }
  }
}
