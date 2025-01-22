import { IGymGlobal } from '@/application/@global/types/gym';

interface IServiceGymExists {
  execute(gym?: IGymGlobal): Promise<IGymGlobal>;
}

export class ServiceGymExists implements IServiceGymExists {
  async execute(gym?: IGymGlobal) {
    if (!gym?.id || !gym?.title || !gym?.latitude || !gym?.longitude) {
      throw new Error('Unexpect: Gym not found');
    }

    return gym;
  }
}
