import { CustomException } from '@/application/@exception/@root-exception';
import { IGymGlobal } from '@/application/@global/types/gym';

interface IServiceGymExists {
  execute(gym: IGymGlobal | null): Promise<IGymGlobal>;
}

export class ServiceGymExists implements IServiceGymExists {
  async execute(gym: IGymGlobal | null) {
    if (!gym?.id || !gym?.title || !gym?.latitude || !gym?.longitude) {
      throw new CustomException('Gym not found', 404);
    }

    return gym;
  }
}
