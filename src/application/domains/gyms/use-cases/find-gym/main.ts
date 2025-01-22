import { IReturnDefaultDomainGlobal } from '@/application/@global/types/return-default-domain';
import { IRepositoryGyms } from '../../repositories/interface';
import { IGymGlobal } from '../../repositories/repository';
import { ServiceGymAlreadyExistsError } from '../../services/gym-alredy-exists';
import { ReturnError } from './returns/errors';
import { ReturnSuccess } from './returns/success';

type IReturnFindGym = IReturnDefaultDomainGlobal<{ gym: IGymGlobal } | null>;

interface IFindGymUseCase {
  execute(gymId: string): Promise<IReturnFindGym>;
}

export type { IReturnFindGym };

export class FindGymUseCase implements IFindGymUseCase {
  constructor(private readonly repository: IRepositoryGyms) {}

  async execute(gymId: string) {
    try {
      const gym = await this.repository.findById(gymId);

      await new ServiceGymAlreadyExistsError().execute(gym);

      return await new ReturnSuccess().execute(gym);
    } catch (error) {
      return await new ReturnError().execute(error);
    }
  }
}
