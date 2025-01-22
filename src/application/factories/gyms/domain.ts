import { GymsDomain } from '../../domains/gyms/main';
import { RepositoryGyms } from '../../domains/gyms/repositories/repository';

export class FactoryGymsDomain {
  static create() {
    const repositoryGyms = new RepositoryGyms();
    return new GymsDomain(repositoryGyms);
  }
}
