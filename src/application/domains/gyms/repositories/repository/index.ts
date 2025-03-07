import { AdapterPrisma } from '@/application/@adapters/repository/prisma';
import { IGymGlobal } from '@/application/@global/types/gym';
import { IDataRequest, IRepositoryGyms, TLocationGym } from '../interface';

export type { IDataRequest, IGymGlobal };

export class RepositoryGyms implements IRepositoryGyms {
  constructor(private readonly db = new AdapterPrisma()) {}

  async create(data: IDataRequest) {
    const newGym = await this.db.prisma.gym.create({
      data: {
        title: data.title,
        latitude: data.latitude,
        longitude: data.longitude,
        phone: data.phone,
        description: data.description,
      },
    });

    return {
      ...newGym,
      latitude: newGym.latitude.toNumber(),
      longitude: newGym.longitude.toNumber(),
    };
  }

  async findById(id: string) {
    const gym = await this.db.prisma.gym.findUnique({
      where: { id },
    });

    if (!gym) return null;

    return {
      ...gym,
      latitude: gym.latitude.toNumber(),
      longitude: gym.longitude.toNumber(),
    };
  }

  async findByLocation(location: TLocationGym) {
    const gym = await this.db.prisma.gym.findFirst({
      where: {
        latitude: {
          lte: location.latitude + 0.1,
          gte: location.latitude - 0.1,
        },
        longitude: {
          lte: location.longitude + 0.1,
          gte: location.longitude - 0.1,
        },
      },
    });

    if (!gym) return null;

    return {
      ...gym,
      latitude: gym.latitude.toNumber(),
      longitude: gym.longitude.toNumber(),
    };
  }
}
