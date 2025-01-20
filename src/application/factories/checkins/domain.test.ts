import { CheckInDomain } from '@/domain/checkins/main';
import { RepositoryCheckInTest } from '@/domain/checkins/repositories/repository-test';
import { GymsDomain } from '@/domain/gyms/main';
import { RepositoryGymsTest } from '@/domain/gyms/repositories/repository-test';

export class FactoryCheckInsDomainTest {
  static create() {
    const repositoryCheckIns = new RepositoryCheckInTest();
    const repositoryGyms = new RepositoryGymsTest();
    const domainGyms = new GymsDomain(repositoryGyms);
    return new CheckInDomain(repositoryCheckIns, domainGyms);
  }
}
