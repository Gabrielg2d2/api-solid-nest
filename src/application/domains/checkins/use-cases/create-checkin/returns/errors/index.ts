import { PresenterErrorGlobal } from '@/application/@global/class/presenter/error';
import { ITypeMessageGlobal } from '@/application/@global/types/type-message';

export class ReturnError extends PresenterErrorGlobal {
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
            ptBr: 'Você já fez check-in hoje',
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
            ptBr: 'Você não está próximo a academia',
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
