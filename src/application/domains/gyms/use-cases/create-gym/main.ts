import { IReturnDefaultDomainGlobal } from '@/application/@global/types/return-default-domain';
import { IRepositoryGyms } from '../../repositories/interface';
import { IDataRequest, IGymGlobal } from '../../repositories/repository';
import { ErrorsCreateGym } from './returns/errors';
import { SuccessCreateGym } from './returns/success';

type IReturnCheckInCreate = IReturnDefaultDomainGlobal<{
  gym: IGymGlobal;
} | null>;

interface ICreateGymUseCase {
  execute(data: IDataRequest): Promise<IReturnCheckInCreate>;
}

export type { IDataRequest, IReturnCheckInCreate };

export class CreateGymUseCase implements ICreateGymUseCase {
  constructor(private readonly repository: IRepositoryGyms) {}

  async execute(data: IDataRequest) {
    try {
      const newGym = await this.repository.create(data);

      return await new SuccessCreateGym().execute(newGym);
    } catch (error) {
      return await new ErrorsCreateGym().execute(error);
    }
  }
}
