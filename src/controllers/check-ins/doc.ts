import { FactoryCheckInsDomainDoc } from '@/application/factories/checkins/doc';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseCheckInsController } from './base.controller';

@ApiTags('doc/check-ins')
@Controller('/check-ins')
export class DocCheckInsController extends BaseCheckInsController {
  constructor() {
    super();
    this.domain = FactoryCheckInsDomainDoc.create();
  }
}
