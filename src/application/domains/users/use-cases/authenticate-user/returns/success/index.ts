import { IReturnDefaultDomainGlobal } from '@/application/@global/types/return-default-domain';
import { ITypeMessageGlobal } from '@/application/@global/types/type-message';
import { IUserGlobal } from '@/application/@global/types/user';

export type IDataSuccess = {
  user: IUserGlobal | null;
};
interface ISuccessAuthenticateUser {
  execute(data: IDataSuccess): Promise<
    IReturnDefaultDomainGlobal<{
      user: IUserGlobal;
    }>
  >;
}

export class SuccessAuthenticateUser implements ISuccessAuthenticateUser {
  async execute({ user }: IDataSuccess) {
    if (!user?.id) {
      throw new Error('Unexpected: Data is required');
    }

    return {
      data: {
        user,
      },
      message: {
        en: 'User authenticated successfully',
        pt: 'Usuário autenticado com sucesso',
      },
      typeMessage: ITypeMessageGlobal.SUCCESS,
      statusCode: 200,
      error: null,
    };
  }
}
