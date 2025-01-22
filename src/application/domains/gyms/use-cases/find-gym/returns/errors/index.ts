import { PresenterErrorGlobal } from '@/application/@global/class/presenter/error';
import { ITypeMessageGlobal } from '@/application/@global/types/type-message';

export class ReturnError extends PresenterErrorGlobal {
  constructor() {
    super();
  }

  async execute(error: Error | unknown) {
    if (error instanceof Error) {
      if (error.message === 'Error: Gym not found') {
        return {
          data: null,
          message: {
            en: 'Gym not found',
            ptBr: 'Academia não encontrada',
          },
          typeMessage: ITypeMessageGlobal.ERROR,
          statusCode: 404,
          error: null,
        };
      }
    }

    return await super.serverInternalError(error);
  }
}
