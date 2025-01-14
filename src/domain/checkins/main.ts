import { GymsDomain } from '../gyms/main';
import { RepositoryCheckIn } from './repositories/repository';
import {
  CreateCheckInUseCase,
  IDataRequest,
  IReturnCheckInCreate,
} from './use-cases/create-checkin/main';
import { FetchHistoryCheckInsUseCase } from './use-cases/fetch-history-check-ins/main';

interface ICheckInDomain {
  create(data: IDataRequest): Promise<IReturnCheckInCreate>;
  fetchHistoryCheckIns(userId: string): Promise<any>;
}

export type { IDataRequest, IReturnCheckInCreate };

export class CheckInDomain implements ICheckInDomain {
  constructor(
    private readonly repository = new RepositoryCheckIn(),
    private readonly domainGyms = new GymsDomain(),
  ) {}

  async create(data: IDataRequest) {
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
