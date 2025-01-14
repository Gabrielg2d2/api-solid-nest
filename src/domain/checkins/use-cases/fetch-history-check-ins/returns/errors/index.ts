import { CustomErrorService } from '@/domain/@global/class/errors/service';
import { IReturnDefaultDomainGlobal } from '@/domain/@global/types/return-default-domain';

interface IErrorsSuccessFetchHistoryCheckIns {
  execute(error: Error | unknown): Promise<IReturnDefaultDomainGlobal<null>>;
}

export class ErrorsSuccessFetchHistoryCheckIns
  implements IErrorsSuccessFetchHistoryCheckIns
{
  async execute(error: Error | unknown) {
    return new CustomErrorService().execute(error);
  }
}
