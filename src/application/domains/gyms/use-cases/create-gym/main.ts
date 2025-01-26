import { IRepositoryGyms } from '../../repositories/interface';
import { IDataRequest, IGymGlobal } from '../../repositories/repository';

type IReturnCheckInCreate = Promise<IGymGlobal>;

interface ICreateGymUseCase {
  execute(data: IDataRequest): IReturnCheckInCreate;
}

export type { IDataRequest, IReturnCheckInCreate };

export class CreateGymUseCase implements ICreateGymUseCase {
  constructor(private readonly repository: IRepositoryGyms) {}

  async execute(data: IDataRequest) {
    const newGym = await this.repository.create(data);

    return newGym;
  }
}
