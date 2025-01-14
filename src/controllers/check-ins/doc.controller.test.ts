import { CheckInDomain } from '@/domain/checkins/main';
import { RepositoryCheckInTest } from '@/domain/checkins/repositories/repository-test';
import { GymsDomain } from '@/domain/gyms/main';
import { RepositoryGymsTest } from '@/domain/gyms/repositories/repository-test';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseCheckInsController } from './base.controller';

@ApiTags('doc/check-ins')
@Controller('/check-ins')
export class DocCheckInsController extends BaseCheckInsController {
  private repositoryCheckIns = new RepositoryCheckInTest();
  private repositoryGyms = new RepositoryGymsTest();
  private domainGyms = new GymsDomain(this.repositoryGyms);

  constructor() {
    super();
    this.domain = new CheckInDomain(this.repositoryCheckIns, this.domainGyms);
  }
}
