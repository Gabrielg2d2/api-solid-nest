import { IReturnDefaultDomainGlobal } from '@/application/@global/types/return-default-domain';
import { ICheckIn, IRepositoryCheckIn } from '../../repositories/interface';
import { ReturnError } from './errors';
import { ReturnSuccess } from './returns/success';

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

      return await new ReturnSuccess().execute(checkIns);
    } catch (error) {
      return await new ReturnError().execute(error);
    }
  }
}
