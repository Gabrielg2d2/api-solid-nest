import { PresenterSuccessGlobal } from '@/application/@global/class/presenter/success';
import { IReturnDefaultDomainGlobal } from '@/application/@global/types/return-default-domain';

interface IReturnSuccess<T> {
  execute(data: T): Promise<IReturnDefaultDomainGlobal<T>>;
}

export class ReturnSuccess<T> implements IReturnSuccess<T> {
  async execute(data: T): Promise<IReturnDefaultDomainGlobal<T>> {
    return await new PresenterSuccessGlobal<T>().execute({
      data,
      statusCode: 201,
      message: {
        en: 'Check-in created successfully',
        ptBr: 'Check-in criado com sucesso',
      },
    });
  }
}
