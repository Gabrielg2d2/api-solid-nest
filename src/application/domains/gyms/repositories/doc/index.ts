import { IGymGlobal } from '@/application/@global/types/gym';
import { randomUUID } from 'node:crypto';
import { IDataRequest, IRepositoryGyms } from '../interface';

export class RepositoryGymsTest implements IRepositoryGyms {
  private static instance: RepositoryGymsTest;
  private listGyms: IGymGlobal[] = [
    {
      id: '123',
      title: 'Gym Test',
      phone: '123456789',
      latitude: 100,
      longitude: 100,
      description: 'Description Test',
    },
    {
      id: 'test-id',
      title: 'Gym Test 2',
      phone: '123456789',
      latitude: 200,
      longitude: 200,
      description: 'Description Test 2',
    },
  ];

  private constructor() {}

  public static getInstance() {
    if (!RepositoryGymsTest.instance) {
      RepositoryGymsTest.instance = new RepositoryGymsTest();
    }
    return RepositoryGymsTest.instance;
  }

  async create(data: IDataRequest) {
    const newGym = {
      id: randomUUID(),
      title: data.title,
      latitude: data.latitude,
      longitude: data.longitude,
      phone: data.phone,
      description: data.description,
      created_at: new Date(),
    };

    this.listGyms.push(newGym);

    return newGym;
  }

  async findById(id: string) {
    const gym = this.listGyms.find((gym) => gym.id === id);

    if (!gym) return null;

    return gym;
  }

  // TODO: APENAS DOCUMENTAÇÃO - INICIO
  async getAllGyms() {
    return this.listGyms;
  }
}
