import { ConflictException } from '@nestjs/common';
import { ICheckIn } from '../../repositories/repository';

export class ServiceCheckInAlreadyExistsToday {
  async execute(data: ICheckIn | null) {
    if (data?.id) throw new ConflictException('Check-in already exists today');
  }
}
