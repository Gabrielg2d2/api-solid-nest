import { AdapterDayjs } from '@/application/@adapters/date/dayjs';
import { randomUUID } from 'node:crypto';
import { ICheckIn, IDataCreateRequest, IRepositoryCheckIn } from '../interface';

export class RepositoryCheckInTest implements IRepositoryCheckIn {
  private static instance: RepositoryCheckInTest;
  private listCheckIn: ICheckIn[] = [
    {
      id: randomUUID(),
      created_at: new Date(),
      user_id: '123123123',
      gym_id: '123',
      validated_at: null,
    },
  ];

  private constructor(private readonly adapterDate = new AdapterDayjs()) {}

  public static getInstance() {
    if (!RepositoryCheckInTest.instance) {
      RepositoryCheckInTest.instance = new RepositoryCheckInTest();
    }
    return RepositoryCheckInTest.instance;
  }

  async create(data: IDataCreateRequest) {
    const checkIn: ICheckIn = {
      id: randomUUID(),
      created_at: new Date(),
      user_id: data.userId,
      gym_id: data.gymId,
      validated_at: null,
    };

    this.listCheckIn.push(checkIn);

    return checkIn;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = this.adapterDate.dayjs(date).startOf('date');
    const endOfTheDay = this.adapterDate.dayjs(date).endOf('date');

    const checkInOnSomeDate = this.listCheckIn.find((checkIn) => {
      const checkInDate = this.adapterDate.dayjs(checkIn.created_at);
      const isOnSameDay =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return checkIn.user_id === userId && isOnSameDay;
    });

    if (!checkInOnSomeDate) return null;

    return checkInOnSomeDate;
  }

  async findManyByUserId(userId: string) {
    return this.listCheckIn.filter((checkIn) => checkIn.user_id === userId);
  }
}
