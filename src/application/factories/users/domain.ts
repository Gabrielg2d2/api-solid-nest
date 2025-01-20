import { UsersDomain } from '@/domain/users/main';
import { RepositoryUsers } from '@/domain/users/repositories/repository';

export class FactoryUsersDomain {
  static create() {
    const repository = new RepositoryUsers();
    return new UsersDomain(repository);
  }
}
