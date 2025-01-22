import { PresenterSuccessGlobal } from '@/application/@global/class/presenter/success';
import { IGymGlobal } from '@/application/@global/types/gym';

type IData = { gym: IGymGlobal };

export class ReturnSuccess {
  async execute(data: IGymGlobal | null) {
    return await new PresenterSuccessGlobal<IData>().execute({
      data: {
        gym: data,
      },
      statusCode: 200,
      message: {
        en: 'Gym found successfully',
        ptBr: 'Academia encontrada com sucesso',
      },
    });
  }
}
