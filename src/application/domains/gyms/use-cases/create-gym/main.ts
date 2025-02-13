import { ConflictError } from '@/application/@exception/custom-exception';
import { IRepositoryGyms } from '../../repositories/interface';
import { IDataRequest, IGymGlobal } from '../../repositories/repository';

type IReturnCheckInCreate = Promise<IGymGlobal>;

type IDataResponse = IGymGlobal;

interface ICreateGymUseCase {
  execute(data: IDataRequest): IReturnCheckInCreate;
}

export type { IDataRequest, IDataResponse, IReturnCheckInCreate };

export class CreateGymUseCase implements ICreateGymUseCase {
  constructor(private readonly repository: IRepositoryGyms) {}

  async execute(data: IDataRequest) {
    const gym = await this.repository.findByLocation({
      latitude: data.latitude,
      longitude: data.longitude,
    });

    if (gym) {
      throw new ConflictError('Gym already exists');
    }

    const newGym = await this.repository.create(data);

    return newGym;
  }
}
