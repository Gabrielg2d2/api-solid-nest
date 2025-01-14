import { CheckInDomain } from '@/domain/checkins/main';
import { RepositoryCheckIn } from '@/domain/checkins/repositories/repository';
import { GymsDomain } from '@/domain/gyms/main';
import { RepositoryGyms } from '@/domain/gyms/repositories/repository';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseCheckInsController } from './base.controller';

@ApiTags('users')
@Controller('/users')
export class CheckInsController extends BaseCheckInsController {
  private repositoryCheckIns = new RepositoryCheckIn();
  private repositoryGyms = new RepositoryGyms();
  private domainGyms = new GymsDomain(this.repositoryGyms);

  constructor() {
    super();
    this.domain = new CheckInDomain(this.repositoryCheckIns, this.domainGyms);
  }
}
