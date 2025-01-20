import { UsersDomain } from '@/domain/users/main';
import { RepositoryUserTest } from '@/domain/users/repositories/repository-test';

export class FactoryUsersDomainTest {
  static create() {
    const repository = new RepositoryUserTest();
    return new UsersDomain(repository);
  }
}
