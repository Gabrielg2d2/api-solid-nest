import { UsersDomain } from '../../domains/users/main';
import { RepositoryUserTest } from '../../domains/users/repositories/doc';

export class FactoryUsersDomainDoc {
  static create() {
    const repository = RepositoryUserTest.getInstance();
    return new UsersDomain(repository);
  }
}
