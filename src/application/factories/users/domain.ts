import { UsersDomain } from '../../domains/users/main';
import { RepositoryUsers } from '../../domains/users/repositories/repository';

export class FactoryUsersDomainTest {
  static async create() {
    const repository = new RepositoryUsers();
    return new UsersDomain(repository);
  }
}
