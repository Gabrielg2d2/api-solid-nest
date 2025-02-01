import { GymsDomain } from '../gyms/main';
import { ICheckIn, IRepositoryCheckIn } from './repositories/interface';
import {
  CreateCheckInUseCase,
  IDataCreateRequest as IDataRequestCreateCheckIn,
  IDataResponse as IDataResponseCreateCheckIn,
  IReturnCheckInCreate,
} from './use-cases/create-checkin/main';
import {
  FetchHistoryCheckInsUseCase,
  IDataResponse as IDataResponseFetchHistoryCheckIns,
} from './use-cases/fetch-history-check-ins/main';

interface ICheckInDomain {
  create(data: IDataRequestCreateCheckIn): IReturnCheckInCreate;
  fetchHistoryCheckIns(userId: string): Promise<ICheckIn[]>;
}

export type {
  IDataRequestCreateCheckIn,
  IDataResponseCreateCheckIn,
  IDataResponseFetchHistoryCheckIns,
  IReturnCheckInCreate,
};

export class CheckInDomain implements ICheckInDomain {
  constructor(
    private readonly repository: IRepositoryCheckIn,
    private readonly domainGyms: GymsDomain,
  ) {}

  async create(data: IDataRequestCreateCheckIn) {
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
