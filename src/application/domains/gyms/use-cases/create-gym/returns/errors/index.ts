import { PresenterErrorGlobal } from '@/application/@global/class/presenter/error';

export class ReturnError extends PresenterErrorGlobal {
  constructor() {
    super();
  }
  async execute(error: Error | unknown) {
    return await super.serverInternalError(error);
  }
}
