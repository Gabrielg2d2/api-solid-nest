import { CustomErrorGlobal } from '@/application/@global/class/errors/custom';
import { IUserGlobal } from '@/application/@global/types/user';

interface IServiceUserValidation {
  execute(user: IUserGlobal | null): Promise<void>;
}

export class ServiceUserValidation implements IServiceUserValidation {
  async execute(user: IUserGlobal | null) {
    if (!user?.id || !user?.name || !user?.email || !user?.password_hash) {
      throw new CustomErrorGlobal({
        message: 'Error: User not found',
      });
    }
  }
}
