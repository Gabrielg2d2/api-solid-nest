import { GymsDomain } from '../../domains/gyms/main';
import { RepositoryGymsTest } from '../../domains/gyms/repositories/repository-test';

export class FactoryGymsDomainTest {
  static create() {
    const repositoryGyms = new RepositoryGymsTest();
    return new GymsDomain(repositoryGyms);
  }
}
