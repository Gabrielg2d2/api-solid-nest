import { CheckInDomain } from '@/domain/checkins/main';
import { RepositoryCheckIn } from '@/domain/checkins/repositories/repository';
import { GymsDomain } from '@/domain/gyms/main';
import { RepositoryGyms } from '@/domain/gyms/repositories/repository';

export class FactoryCheckInsDomain {
  static create() {
    const repositoryCheckIns = new RepositoryCheckIn();
    const repositoryGyms = new RepositoryGyms();
    const domainGyms = new GymsDomain(repositoryGyms);
    return new CheckInDomain(repositoryCheckIns, domainGyms);
  }
}
