import { IUserGlobal } from '@/application/@global/types/user';

export type IRequestCreateUser = {
  name: string;
  email: string;
  password: string;
};

export interface IRepositoryUsers {
  setHeader(header: string): Promise<void>;
  getUserById(id: string): Promise<IUserGlobal | null>;
  getUserByEmail(email: string): Promise<IUserGlobal | null>;
  createUser(data: IRequestCreateUser): Promise<IUserGlobal | null>;
}
