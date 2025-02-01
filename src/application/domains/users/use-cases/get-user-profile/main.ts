import { IUserGlobal } from '@/application/@global/types/user';
import { IRepositoryUsers } from '../../repositories/interface';
import { ServiceUserValidation } from '../../services/user-validation';

type IReturnDefaultGetProfile = Promise<IUserGlobal>;

type IDataRequest = string;
type IDataResponse = IUserGlobal;

export type { IDataRequest, IDataResponse, IReturnDefaultGetProfile };

interface IGetProfileUseCase {
  execute(userId: string): IReturnDefaultGetProfile;
}
export class GetProfileUseCase implements IGetProfileUseCase {
  constructor(private readonly repository: IRepositoryUsers) {}

  async execute(userId: string) {
    const user = await this.repository.getUserById(userId);

    await new ServiceUserValidation().execute(user);

    return user as IUserGlobal;
  }
}
