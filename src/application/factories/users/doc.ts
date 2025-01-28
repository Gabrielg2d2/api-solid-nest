import { UsersDomain } from '../../domains/users/main';
import { RepositoryUserTest } from '../../domains/users/repositories/repository-test';

export class FactoryUsersDomainTest {
  static create() {
    const repository = RepositoryUserTest.getInstance();
    return new UsersDomain(repository);
  }
}
