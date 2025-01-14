import { IReturnDefaultDomainGlobal } from '@/domain/@global/types/return-default-domain';
import { ICheckIn, IRepositoryCheckIn } from '../../repositories/interface';
import { ErrorsSuccessFetchHistoryCheckIns } from './returns/errors';
import { SuccessFetchHistoryCheckIns } from './returns/success';

type IDataRequest = {
  userId: string;
};

type IFetchHistoryCheckInsUseCase = {
  execute(data: IDataRequest): Promise<
    IReturnDefaultDomainGlobal<{
      historyCheckIns: ICheckIn[];
    } | null>
  >;
};

export class FetchHistoryCheckInsUseCase
  implements IFetchHistoryCheckInsUseCase
{
  constructor(private readonly repository: IRepositoryCheckIn) {}

  async execute(data: IDataRequest) {
    try {
      const checkIns = await this.repository.findManyByUserId(data.userId);

      return await new SuccessFetchHistoryCheckIns().execute(checkIns);
    } catch (error) {
      return await new ErrorsSuccessFetchHistoryCheckIns().execute(error);
    }
  }
}
