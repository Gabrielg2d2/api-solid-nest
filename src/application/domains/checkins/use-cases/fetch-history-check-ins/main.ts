import { IReturnDefaultDomainGlobal } from '@/domain/@global/types/return-default-domain';
import { ICheckIn, IRepositoryCheckIn } from '../../repositories/interface';
import { ErrorsSuccessFetchHistoryCheckIns } from './returns/errors';
import { SuccessFetchHistoryCheckIns } from './returns/success';

type IFetchHistoryCheckInsUseCase = {
  execute(userId: string): Promise<
    IReturnDefaultDomainGlobal<{
      historyCheckIns: ICheckIn[];
    } | null>
  >;
};

export class FetchHistoryCheckInsUseCase
  implements IFetchHistoryCheckInsUseCase
{
  constructor(private readonly repository: IRepositoryCheckIn) {}

  async execute(userId: string) {
    try {
      const checkIns = await this.repository.findManyByUserId(userId);

      return await new SuccessFetchHistoryCheckIns().execute(checkIns);
    } catch (error) {
      return await new ErrorsSuccessFetchHistoryCheckIns().execute(error);
    }
  }
}
