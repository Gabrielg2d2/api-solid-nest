import { UsersDomain } from '../../domains/users/main';
import { RepositoryUserTest } from '../../domains/users/repositories/repository-test';

export class FactoryUsersDomainTest {
  static create() {
    const repository = new RepositoryUserTest();
    return new UsersDomain(repository);
  }
}
