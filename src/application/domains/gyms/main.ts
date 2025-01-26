import { IRepositoryGyms } from './repositories/interface';
import {
  CreateGymUseCase,
  IDataRequest,
  IReturnCheckInCreate,
} from './use-cases/create-gym/main';
import { FindGymUseCase, IReturnFindGym } from './use-cases/find-gym/main';

interface IGymsDomain {
  create(data: IDataRequest): IReturnCheckInCreate;
  findGym(gymId: string): IReturnFindGym;
}

export type { IDataRequest, IReturnCheckInCreate };

export class GymsDomain implements IGymsDomain {
  constructor(private repository: IRepositoryGyms) {}

  async create(data: IDataRequest) {
    return await new CreateGymUseCase(this.repository).execute(data);
  }

  async findGym(gymId: string) {
    return await new FindGymUseCase(this.repository).execute(gymId);
  }
}
