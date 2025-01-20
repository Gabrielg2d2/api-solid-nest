import { FactoryCheckInsDomain } from '@/application/factories/checkins/domain';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseCheckInsController } from './base.controller';

@ApiTags('users')
@Controller('/users')
export class CheckInsController extends BaseCheckInsController {
  constructor() {
    super();
    this.domain = FactoryCheckInsDomain.create();
  }
}
