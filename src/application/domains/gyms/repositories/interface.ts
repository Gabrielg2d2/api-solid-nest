import { IGymGlobal } from './repository';

export type IDataRequest = {
  title: string;
  description: string;
  phone: string;
  latitude: number;
  longitude: number;
};

export interface IRepositoryGyms {
  create(data: IDataRequest): Promise<IGymGlobal>;
  findById(id: string): Promise<IGymGlobal | null>;
}
