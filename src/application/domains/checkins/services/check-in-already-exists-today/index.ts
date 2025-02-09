import { CustomException } from '@/application/@exception/@root-exception';
import { ICheckIn } from '../../repositories/repository';

export class ServiceCheckInAlreadyExistsToday {
  async execute(data: ICheckIn | null) {
    if (data?.id) throw new CustomException('Check in already done today', 400);
  }
}
