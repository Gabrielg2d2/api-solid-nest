import { GymsDomain } from '../../domains/gyms/main';
import { RepositoryGymsTest } from '../../domains/gyms/repositories/doc';

export class FactoryGymsDomainDoc {
  static create() {
    const repositoryGyms = RepositoryGymsTest.getInstance();
    return new GymsDomain(repositoryGyms);
  }

  static createWithClearedRepository() {
    const repositoryGyms = RepositoryGymsTest.getInstance();
    repositoryGyms.utilsTest().clear();
    return new GymsDomain(repositoryGyms);
  }
}
