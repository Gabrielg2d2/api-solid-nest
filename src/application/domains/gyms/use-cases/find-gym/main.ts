import { IRepositoryGyms } from '../../repositories/interface';
import { IGymGlobal } from '../../repositories/repository';
import { ServiceGymAlreadyExistsError } from '../../services/gym-alredy-exists';

type IReturnFindGym = Promise<IGymGlobal>;
type IDataResponse = IGymGlobal;

interface IFindGymUseCase {
  execute(gymId: string): IReturnFindGym;
}

export type { IDataResponse, IReturnFindGym };

export class FindGymUseCase implements IFindGymUseCase {
  constructor(private readonly repository: IRepositoryGyms) {}

  async execute(gymId: string) {
    const gym = await this.repository.findById(gymId);

    await new ServiceGymAlreadyExistsError().execute(gym);

    return gym as IGymGlobal;
  }
}
