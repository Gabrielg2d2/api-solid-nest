import { GymsDomain } from '@/domain/gyms/main';
import { RepositoryGyms } from '@/domain/gyms/repositories/repository';

export class FactoryGymsDomain {
  static create() {
    const repositoryGyms = new RepositoryGyms();
    return new GymsDomain(repositoryGyms);
  }
}
