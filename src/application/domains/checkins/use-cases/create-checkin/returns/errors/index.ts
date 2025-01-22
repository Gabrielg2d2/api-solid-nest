import { PresenterErrorGlobal } from '@/application/@global/class/presenter/error';
import { IReturnDefaultDomainGlobal } from '@/application/@global/types/return-default-domain';
import { ITypeMessageGlobal } from '@/application/@global/types/type-message';

interface IErrorsCreateCheckIn {
  execute(error: Error | unknown): Promise<IReturnDefaultDomainGlobal<null>>;
}

export class PresenterErrorCreateCheckIn
  extends PresenterErrorGlobal
  implements IErrorsCreateCheckIn
{
  constructor() {
    super();
  }

  async execute(error: Error | unknown) {
    if (error instanceof Error) {
      if (error.message === 'Error: Check in already done today') {
        return {
          data: null,
          message: {
            en: 'You have already checked in today',
            pt: 'Você já fez check-in hoje',
          },
          typeMessage: ITypeMessageGlobal.WARNING,
          statusCode: 400,
          error: null,
        };
      }

      if (error.message === 'Error: You are not close to the gym') {
        return {
          data: null,
          message: {
            en: 'You are not close to the gym',
            pt: 'Você não está próximo a academia',
          },
          typeMessage: ITypeMessageGlobal.WARNING,
          statusCode: 400,
          error: null,
        };
      }
    }

    return super.serverInternalError(error);
  }
}
