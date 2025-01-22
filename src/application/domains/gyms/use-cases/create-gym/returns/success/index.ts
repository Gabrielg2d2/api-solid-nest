import { PresenterSuccessGlobal } from '@/application/@global/class/presenter/success';
import { IGymGlobal } from '@/application/@global/types/gym';

type IData = { gym: IGymGlobal };

export class ReturnSuccess {
  async execute(data: IGymGlobal) {
    return await new PresenterSuccessGlobal<IData>().execute({
      data: {
        gym: data,
      },
      statusCode: 201,
      message: {
        en: 'Gym created successfully',
        ptBr: 'Academia criada com sucesso',
      },
    });
  }
}
