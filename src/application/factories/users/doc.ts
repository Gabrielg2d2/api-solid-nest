import { UsersDomain } from '../../domains/users/main';
import { RepositoryUserTest } from '../../domains/users/repositories/doc';

export class FactoryUsersDomainTest {
  static create() {
    const repository = RepositoryUserTest.getInstance();
    return new UsersDomain(repository);
  }
}
