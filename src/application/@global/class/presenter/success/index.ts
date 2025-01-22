import { IReturnDefaultDomainGlobal } from '@/application/@global/types/return-default-domain';
import { ITypeMessageGlobal } from '@/application/@global/types/type-message';

type IProps = {
  statusCode: number;
  data: any;
  message?: {
    en: string;
    ptBr: string;
  };
};

interface IPresenterSuccessGlobal<T> {
  execute(props: IProps): Promise<IReturnDefaultDomainGlobal<T>>;
}

export class PresenterSuccessGlobal<T> implements IPresenterSuccessGlobal<T> {
  async execute(props: IProps) {
    if (!props?.data) {
      throw new Error('Unexpected: Data is required');
    }

    return {
      data: props.data as T,
      message: props.message || { en: '', ptBr: '' },
      typeMessage: ITypeMessageGlobal.SUCCESS,
      statusCode: props.statusCode,
      error: null,
    };
  }
}
