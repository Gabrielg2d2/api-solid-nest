import { IReturnDefaultDomainGlobal } from '@/application/@global/types/return-default-domain';
import { ITypeMessageGlobal } from '@/application/@global/types/type-message';

interface IPresenterErrorGlobal {
  serverInternalError(
    error: Error | unknown,
  ): Promise<IReturnDefaultDomainGlobal<null>>;
}

export class PresenterErrorGlobal implements IPresenterErrorGlobal {
  async serverInternalError(error: Error | unknown) {
    return {
      data: null,
      message: {
        en: 'Service unavailable, try again later',
        pt: 'Serviço indisponível, tente novamente mais tarde',
      },
      typeMessage: ITypeMessageGlobal.FATAL,
      statusCode: 500,
      error: error instanceof Error ? error.message : error,
    };
  }
}
