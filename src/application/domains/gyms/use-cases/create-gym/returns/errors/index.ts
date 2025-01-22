import { PresenterErrorGlobal } from '@/application/@global/class/presenter/error';
import { IReturnDefaultDomainGlobal } from '@/application/@global/types/return-default-domain';

interface IReturnError {
  execute(error: Error | unknown): Promise<IReturnDefaultDomainGlobal<null>>;
}

export class ReturnError extends PresenterErrorGlobal implements IReturnError {
  constructor() {
    super();
  }
  async execute(error: Error | unknown) {
    return await super.serverInternalError(error);
  }
}
