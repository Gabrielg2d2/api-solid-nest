import { ICheckIn, IDataCreateRequest } from '../../repositories/repository';
import { ServiceCheckInAlreadyExistsToday } from '../../services/check-in-already-exists-today';

import { GymsDomain } from '@/application/domains/gyms/main';
import { IRepositoryCheckIn } from '../../repositories/interface';
import { ServiceCheckUserWithinAllowedSpace } from '../../services/check-user-within-allowed-space';
import { ServiceGymExists } from '../../services/gym-exists';

type IReturnCheckInCreate = Promise<ICheckIn>;

interface ICreateCheckInUseCase {
  execute(data: IDataCreateRequest): IReturnCheckInCreate;
}

export type { IDataCreateRequest, IReturnCheckInCreate };

export class CreateCheckInUseCase implements ICreateCheckInUseCase {
  constructor(
    private readonly repository: IRepositoryCheckIn,
    private readonly domainGyms: GymsDomain,
  ) {}

  async execute(data: IDataCreateRequest) {
    const checkInOnSomeDate = await this.repository.findByUserIdOnDate(
      data.userId,
      new Date(),
    );

    // TODO: Refactor this to a service
    if (!data.userId) throw new Error('User not found');

    const result = await this.domainGyms.findGym(data.gymId);

    const gym = await new ServiceGymExists().execute(result);

    await new ServiceCheckUserWithinAllowedSpace().execute(
      {
        latitude: data.userLatitude,
        longitude: data.userLongitude,
      },
      { latitude: gym.latitude, longitude: gym.longitude },
    );

    await new ServiceCheckInAlreadyExistsToday().execute(checkInOnSomeDate);

    const checkIn = await this.repository.create(data);

    return checkIn;
  }
}
