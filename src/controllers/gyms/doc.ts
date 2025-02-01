import { RepositoryGymsTest } from '@/application/domains/gyms/repositories/doc';
import { FactoryGymsDomainDoc } from '@/application/factories/gyms/doc';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseGymsController } from './base.controller';

@ApiTags('doc/gyms')
@Controller('/gyms')
export class DocGymsController extends BaseGymsController {
  private repository = RepositoryGymsTest.getInstance();

  constructor() {
    super();
    this.domain = FactoryGymsDomainDoc.create();
  }
}
