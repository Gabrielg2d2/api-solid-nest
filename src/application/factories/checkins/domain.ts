import { CheckInDomain } from '../../domains/checkins/main';
import { RepositoryCheckIn } from '../../domains/checkins/repositories/repository';
import { GymsDomain } from '../../domains/gyms/main';
import { RepositoryGyms } from '../../domains/gyms/repositories/repository';

export class FactoryCheckInsDomain {
  static create() {
    const repositoryCheckIns = new RepositoryCheckIn();
    const repositoryGyms = new RepositoryGyms();
    const domainGyms = new GymsDomain(repositoryGyms);
    return new CheckInDomain(repositoryCheckIns, domainGyms);
  }
}
