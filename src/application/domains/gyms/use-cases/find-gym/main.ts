import { IReturnDefaultDomainGlobal } from '@/domain/@global/types/return-default-domain';
import { IRepositoryGyms } from '../../repositories/interface';
import { IGymGlobal } from '../../repositories/repository';
import { ServiceGymAlreadyExistsError } from '../../services/gym-alredy-exists';
import { ErrorsFindGym } from './returns/errors';
import { SuccessFindGym } from './returns/success';

type IReturnFindGym = IReturnDefaultDomainGlobal<{ gym: IGymGlobal } | null>;

interface IFindGymUseCase {
  findGym(gymId: string): Promise<IReturnFindGym>;
}

export type { IReturnFindGym };

export class FindGymUseCase implements IFindGymUseCase {
  constructor(private readonly repository: IRepositoryGyms) {}

  async findGym(gymId: string) {
    try {
      const gym = await this.repository.findById(gymId);

      await new ServiceGymAlreadyExistsError().execute(gym);

      return await new SuccessFindGym().execute(gym);
    } catch (error) {
      return await new ErrorsFindGym().execute(error);
    }
  }
}
