import { PresenterSuccessGlobal } from '@/application/@global/class/presenter/success';
import { ICheckIn } from '@/application/domains/checkins/repositories/interface';

type IData = {
  checkIn: ICheckIn;
};

export class ReturnSuccess {
  async execute(data: ICheckIn | null) {
    return await new PresenterSuccessGlobal<IData>().execute({
      data: {
        checkIn: data,
      },
      statusCode: 201,
      message: {
        en: 'Check-in created successfully',
        ptBr: 'Check-in criado com sucesso',
      },
    });
  }
}
