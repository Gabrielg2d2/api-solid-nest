import { PresenterSuccessGlobal } from '@/application/@global/class/presenter/success';
import { ICheckIn } from '../../../../repositories/repository';

type IData = {
  historyCheckIns: ICheckIn[];
};

export class ReturnSuccess {
  async execute(data: ICheckIn[] | null) {
    return await new PresenterSuccessGlobal<IData>().execute({
      data: {
        historyCheckIns: data,
      },
      statusCode: 200,
      message: {
        en: 'History check-ins fetched successfully',
        ptBr: 'Histórico de check-ins buscado com sucesso',
      },
    });
  }
}
