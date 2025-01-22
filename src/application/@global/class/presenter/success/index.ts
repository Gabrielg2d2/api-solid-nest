import { IReturnDefaultDomainGlobal } from '@/application/@global/types/return-default-domain';
import { ITypeMessageGlobal } from '@/application/@global/types/type-message';

interface IPresenterSuccessGlobal<T> {
  execute(data: T): Promise<IReturnDefaultDomainGlobal<T>>;
}

export class PresenterSuccessGlobal<T> implements IPresenterSuccessGlobal<T> {
  constructor(
    private statusCode: number,
    private message = {
      en: '',
      pt: '',
    },
  ) {}

  async execute(data: T) {
    return {
      data,
      message: this.message,
      typeMessage: ITypeMessageGlobal.SUCCESS,
      statusCode: this.statusCode,
      error: null,
    };
  }
}
