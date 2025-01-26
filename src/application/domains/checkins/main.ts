import { GymsDomain } from '../gyms/main';
import { ICheckIn, IRepositoryCheckIn } from './repositories/interface';
import {
  CreateCheckInUseCase,
  IDataCreateRequest,
  IReturnCheckInCreate,
} from './use-cases/create-checkin/main';
import { FetchHistoryCheckInsUseCase } from './use-cases/fetch-history-check-ins/main';

interface ICheckInDomain {
  create(data: IDataCreateRequest): IReturnCheckInCreate;
  fetchHistoryCheckIns(userId: string): Promise<ICheckIn[]>;
}

export type { IDataCreateRequest, IReturnCheckInCreate };

export class CheckInDomain implements ICheckInDomain {
  constructor(
    private readonly repository: IRepositoryCheckIn,
    private readonly domainGyms: GymsDomain,
  ) {}

  async create(data: IDataCreateRequest) {
    return await new CreateCheckInUseCase(
      this.repository,
      this.domainGyms,
    ).execute(data);
  }

  async fetchHistoryCheckIns(userId: string) {
    return await new FetchHistoryCheckInsUseCase(this.repository).execute(
      userId,
    );
  }
}
