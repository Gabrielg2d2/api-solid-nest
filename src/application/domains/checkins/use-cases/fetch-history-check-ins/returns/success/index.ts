import { IReturnDefaultDomainGlobal } from '@/application/@global/types/return-default-domain';
import { ITypeMessageGlobal } from '@/application/@global/types/type-message';
import { ICheckIn } from '../../../../repositories/repository';

interface ISuccessFetchHistoryCheckIns {
  execute(data: ICheckIn[]): Promise<
    IReturnDefaultDomainGlobal<{
      historyCheckIns: ICheckIn[];
    }>
  >;
}

export class SuccessFetchHistoryCheckIns
  implements ISuccessFetchHistoryCheckIns
{
  async execute(data: ICheckIn[] | null) {
    if (!data) {
      throw new Error('Unexpected: Data is required');
    }

    return {
      data: {
        historyCheckIns: data,
      },
      message: {
        en: 'fetch history check-ins successfully',
        pt: 'fetch history check-ins com sucesso',
      },
      typeMessage: ITypeMessageGlobal.SUCCESS,
      statusCode: 200,
      error: null,
    };
  }
}
