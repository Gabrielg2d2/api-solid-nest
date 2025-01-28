import { CheckInDomain } from '../../domains/checkins/main';
import { RepositoryCheckInTest } from '../../domains/checkins/repositories/doc';
import { GymsDomain } from '../../domains/gyms/main';
import { RepositoryGymsTest } from '../../domains/gyms/repositories/doc';

export class FactoryCheckInsDomainDoc {
  static create() {
    const repositoryCheckIns = RepositoryCheckInTest.getInstance();
    const repositoryGyms = RepositoryGymsTest.getInstance();
    const domainGyms = new GymsDomain(repositoryGyms);
    return new CheckInDomain(repositoryCheckIns, domainGyms);
  }
}
