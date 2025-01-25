import { CustomErrorService } from '@/application/@global/class/errors/service';
import { IReturnDefaultDomainGlobal } from '@/application/@global/types/return-default-domain';
import { ITypeMessageGlobal } from '@/application/@global/types/type-message';

interface IErrorsCreateUser {
  execute(error: Error | unknown): Promise<IReturnDefaultDomainGlobal<null>>;
}

export class ErrorsCreateUser extends Error implements IErrorsCreateUser {
  async execute(error: Error | unknown) {
    if (error instanceof Error) {
      if (error.message === 'Error: Invalid content') {
        return {
          data: null,
          message: {
            en: 'Invalid content',
            ptBr: 'Conteúdo inválido',
          },
          typeMessage: ITypeMessageGlobal.ERROR,
          statusCode: 400,
          error,
        };
      }

      if (error.message === 'Error: User already exists') {
        return {
          data: null,
          message: {
            en: 'User already exists',
            ptBr: 'Usuário já existe',
          },
          typeMessage: ITypeMessageGlobal.ERROR,
          statusCode: 409,
          error,
        };
      }
    }

    return new CustomErrorService().execute(error);
  }
}
