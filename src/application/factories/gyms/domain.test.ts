import { GymsDomain } from '@/domain/gyms/main';
import { RepositoryGymsTest } from '@/domain/gyms/repositories/repository-test';

export class FactoryGymsDomainTest {
  static create() {
    const repositoryGyms = new RepositoryGymsTest();
    return new GymsDomain(repositoryGyms);
  }
}
