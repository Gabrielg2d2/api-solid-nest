import { GymsDomain } from '../../domains/gyms/main';
import { RepositoryGymsTest } from '../../domains/gyms/repositories/repository-test';

export class FactoryGymsDomainTest {
  static create() {
    const repositoryGyms = RepositoryGymsTest.getInstance();
    return new GymsDomain(repositoryGyms);
  }
}
