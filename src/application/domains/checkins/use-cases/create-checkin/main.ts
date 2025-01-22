import { ICheckIn, IDataCreateRequest } from '../../repositories/repository';
import { ServiceCheckInAlreadyExistsToday } from '../../services/check-in-already-exists-today';

import { PresenterSuccessGlobal } from '@/application/@global/class/presenter/success';
import { IReturnDefaultDomainGlobal } from '@/application/@global/types/return-default-domain';
import { GymsDomain } from '@/application/domains/gyms/main';
import { IRepositoryCheckIn } from '../../repositories/interface';
import { ServiceCheckUserWithinAllowedSpace } from '../../services/check-user-within-allowed-space';
import { ServiceGymExists } from '../../services/gym-exists';
import { PresenterErrorCreateCheckIn } from './errors';

type IReturnCheckInCreate = IReturnDefaultDomainGlobal<{
  checkIn: ICheckIn;
} | null>;

interface ICreateCheckInUseCase {
  execute(data: IDataCreateRequest): Promise<IReturnCheckInCreate>;
}

export type { IDataCreateRequest, IReturnCheckInCreate };

export class CreateCheckInUseCase implements ICreateCheckInUseCase {
  constructor(
    private readonly repository: IRepositoryCheckIn,
    private readonly domainGyms: GymsDomain,
  ) {}

  async execute(data: IDataCreateRequest) {
    try {
      const checkInOnSomeDate = await this.repository.findByUserIdOnDate(
        data.userId,
        new Date(),
      );

      const result = await this.domainGyms.findGym(data.gymId);

      const gym = await new ServiceGymExists().execute(result.data?.gym);

      await new ServiceCheckUserWithinAllowedSpace().execute(
        {
          latitude: data.userLatitude,
          longitude: data.userLongitude,
        },
        { latitude: gym.latitude, longitude: gym.longitude },
      );

      await new ServiceCheckInAlreadyExistsToday().execute(checkInOnSomeDate);

      const checkIn = await this.repository.create(data);

      return await new PresenterSuccessGlobal<{ checkIn: ICheckIn }>(
        201,
      ).execute({ checkIn });
    } catch (error) {
      return await new PresenterErrorCreateCheckIn().execute(error);
    }
  }
}
