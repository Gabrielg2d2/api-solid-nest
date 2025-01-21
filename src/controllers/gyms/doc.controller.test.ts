import { FactoryGymsDomainTest } from '@/application/factories/Gyms/domain.test';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseGymsController } from './base.controller';

@ApiTags('doc/gyms')
@Controller('/gyms')
export class DocGymsController extends BaseGymsController {
  constructor() {
    super();
    this.domain = FactoryGymsDomainTest.create();
  }
}
