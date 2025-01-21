import { FactoryGymsDomain } from '@/application/factories/gyms/domain';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseGymsController } from './base.controller';

@ApiTags('gyms')
@Controller('/gyms')
export class GymsController extends BaseGymsController {
  constructor() {
    super();
    this.domain = FactoryGymsDomain.create();
  }
}
