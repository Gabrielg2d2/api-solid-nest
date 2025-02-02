import { UsersDomain } from '../../domains/users/main';
import { RepositoryUserTest } from '../../domains/users/repositories/doc';

export class FactoryUsersDomainDoc {
  static create() {
    const repository = RepositoryUserTest.getInstance();
    return new UsersDomain(repository);
  }

  static createWithClearedRepository() {
    const repository = RepositoryUserTest.getInstance();
    repository.utilsTest().clearAllUsers();
    return new UsersDomain(repository);
  }

  static createWithSeedRepository() {
    const repository = RepositoryUserTest.getInstance();
    repository.utilsTest().seedUsers();
    return new UsersDomain(repository);
  }
}
