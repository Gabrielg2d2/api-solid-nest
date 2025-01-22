import { IGymGlobal } from '@/application/@global/types/gym';
import { IReturnDefaultDomainGlobal } from '@/application/@global/types/return-default-domain';
import { ITypeMessageGlobal } from '@/application/@global/types/type-message';

interface ISuccessCreateGym {
  execute(data: IGymGlobal | null): Promise<
    IReturnDefaultDomainGlobal<{
      gym: IGymGlobal;
    }>
  >;
}

export class SuccessCreateGym implements ISuccessCreateGym {
  async execute(data: IGymGlobal | null) {
    if (!data?.id) {
      throw new Error('Unexpected: Data is required');
    }

    return {
      data: {
        gym: data,
      },
      message: {
        en: 'Gym created successfully',
        pt: 'Academia criada com sucesso',
      },
      typeMessage: ITypeMessageGlobal.SUCCESS,
      statusCode: 201,
      error: null,
    };
  }
}
