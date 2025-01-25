import { IReturnDefaultDomainGlobal } from '@/application/@global/types/return-default-domain';
import { ITypeMessageGlobal } from '@/application/@global/types/type-message';
import { IUserGlobal } from '@/application/@global/types/user';

interface ISuccessCreateUser {
  execute(
    newUser: IUserGlobal | null,
  ): Promise<IReturnDefaultDomainGlobal<IUserGlobal>>;
}

export class SuccessCreateUser implements ISuccessCreateUser {
  async execute(newUser: IUserGlobal | null) {
    if (!newUser) throw new Error('Unexpect: Data is required');

    return {
      data: newUser,
      message: {
        en: 'User created successfully',
        ptBr: 'Usuário criado com sucesso',
      },
      typeMessage: ITypeMessageGlobal.SUCCESS,
      statusCode: 201,
      error: null,
    };
  }
}
