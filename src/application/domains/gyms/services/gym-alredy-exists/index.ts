import { NotFoundError } from '@/application/@exception/custom-exception';
import { IGymGlobal } from '../../repositories/repository';

export class ServiceGymAlreadyExistsError {
  async execute(gym: IGymGlobal | null) {
    if (!gym?.id || !gym?.latitude || !gym?.longitude) {
      throw new NotFoundError('Gym not found');
    }
  }
}
