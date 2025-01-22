import { IReturnDefaultDomainGlobal } from '@/application/@global/types/return-default-domain';
import { ITypeMessageGlobal } from '@/application/@global/types/type-message';
import { IUserGlobal } from '@/application/@global/types/user';

type IDataResponse = {
  user: IUserGlobal | null;
};

interface ISuccessGetProfileResponse {
  execute: (data: IDataResponse) => Promise<
    IReturnDefaultDomainGlobal<{
      user: IUserGlobal;
    }>
  >;
}

export class SuccessGetProfile implements ISuccessGetProfileResponse {
  async execute(data: IDataResponse) {
    if (!data?.user?.id && !data?.user?.created_at)
      throw new Error('Unexpected: Data is not valid');

    return {
      data: {
        user: data.user,
      },
      message: {
        en: 'User found successfully',
        pt: 'Usuário encontrado com sucesso',
      },
      typeMessage: ITypeMessageGlobal.SUCCESS,
      statusCode: 200,
      error: null,
    };
  }
}
