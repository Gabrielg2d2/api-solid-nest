import { CustomException } from '@/application/@exception/custom-exception';
import { IUserGlobal } from '@/application/@global/types/user';

interface IServiceValidationUserAlreadyExists {
  execute(user: IUserGlobal | null): Promise<void>;
}

export class ServiceValidationUserAlreadyExists
  implements IServiceValidationUserAlreadyExists
{
  async execute(user: IUserGlobal | null) {
    if (user) {
      throw new CustomException('User already exists', 400);
    }
  }
}
