import { IReturnDefaultDomainGlobal } from '@/domain/@global/types/return-default-domain';
import { IUserGlobal } from '@/domain/@global/types/user';
import { IRepositoryUsers } from '../../repositories/interface';
import { ServiceUserValidation } from '../../services/user-validation';
import { ErrorsGetProfile } from './returns/errors';
import { SuccessGetProfile } from './returns/success';

type IDataRequest = { userId: string };

type IDataResponse = { user: IUserGlobal | null };

type IReturnDefaultGetProfile = Promise<
  IReturnDefaultDomainGlobal<IDataResponse | null>
>;

export type { IDataRequest, IDataResponse, IReturnDefaultGetProfile };

interface IGetProfileUseCase {
  execute(data: IDataRequest): IReturnDefaultGetProfile;
}
export class GetProfileUseCase implements IGetProfileUseCase {
  constructor(private readonly repository: IRepositoryUsers) {}

  async execute({ userId }: IDataRequest) {
    try {
      const user = await this.repository.getUserById(userId);

      await new ServiceUserValidation().execute(user);

      return await new SuccessGetProfile().execute({ user });
    } catch (error) {
      return await new ErrorsGetProfile().execute(error);
    }
  }
}
