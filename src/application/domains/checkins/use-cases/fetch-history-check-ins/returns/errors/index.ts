import { PresenterErrorGlobal } from '@/application/@global/class/presenter/error';
import { IReturnDefaultDomainGlobal } from '@/application/@global/types/return-default-domain';

interface IErrorsSuccessFetchHistoryCheckIns {
  execute(error: Error | unknown): Promise<IReturnDefaultDomainGlobal<null>>;
}

export class ErrorsSuccessFetchHistoryCheckIns
  extends PresenterErrorGlobal
  implements IErrorsSuccessFetchHistoryCheckIns
{
  constructor() {
    super();
  }

  async execute(error: Error | unknown) {
    return await super.serverInternalError(error);
  }
}
