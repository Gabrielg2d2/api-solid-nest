import { ICheckIn, IRepositoryCheckIn } from '../../repositories/interface';

type IFetchHistoryCheckInsUseCase = {
  execute(userId: string): Promise<ICheckIn[]>;
};
export class FetchHistoryCheckInsUseCase
  implements IFetchHistoryCheckInsUseCase
{
  constructor(private readonly repository: IRepositoryCheckIn) {}

  async execute(userId: string) {
    const checkIns = await this.repository.findManyByUserId(userId);

    return checkIns;
  }
}
