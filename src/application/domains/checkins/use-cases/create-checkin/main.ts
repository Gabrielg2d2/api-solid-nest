import { IReturnDefaultDomainGlobal } from '@/domain/@global/types/return-default-domain';
import { GymsDomain } from '@/domain/gyms/main';
import { ICheckIn, IDataCreateRequest } from '../../repositories/repository';
import { ServiceCheckInAlreadyExistsToday } from '../../services/check-in-already-exists-today';

import { IRepositoryCheckIn } from '../../repositories/interface';
import { ServiceCheckUserWithinAllowedSpace } from '../../services/check-user-within-allowed-space';
import { ServiceGymExists } from '../../services/gym-exists';
import { ErrorsCreateCheckIn } from './returns/errors';
import { SuccessCreateCheckIn } from './returns/success';

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

      return await new SuccessCreateCheckIn().execute(checkIn);
    } catch (error) {
      return await new ErrorsCreateCheckIn().execute(error);
    }
  }
}
