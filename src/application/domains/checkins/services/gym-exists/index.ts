import { NotFoundException } from '@/application/@exception/custom-exception';
import { IGymGlobal } from '@/application/@global/types/gym';

interface IServiceGymExists {
  execute(gym: IGymGlobal | null): Promise<IGymGlobal>;
}

export class ServiceGymExists implements IServiceGymExists {
  async execute(gym: IGymGlobal | null) {
    if (!gym?.id || !gym?.title || !gym?.latitude || !gym?.longitude) {
      throw new NotFoundException('Gym not found');
    }

    return gym;
  }
}
