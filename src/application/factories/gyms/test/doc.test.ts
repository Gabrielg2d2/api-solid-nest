import {
  GymsDomain,
  IDataRequestCreateGym,
} from '@/application/domains/gyms/main';
import { beforeEach, describe, expect, test } from 'vitest';
import { FactoryGymsDomainDoc } from '../doc';

type TSutProps = 'default' | 'newRepository' | 'seedRepository';

export function makeSutGyms(type: TSutProps = 'default') {
  let sut: GymsDomain;

  switch (type) {
    case 'newRepository':
      sut = FactoryGymsDomainDoc.createWithClearedRepository();
      break;
    default:
      sut = FactoryGymsDomainDoc.create();
      break;
  }

  return {
    sut,
  };
}

describe('Factory Gyms Domain', () => {
  let sut: GymsDomain;

  beforeEach(() => {
    sut = makeSutGyms('newRepository').sut;
  });

  describe('Create gym', () => {
    test('should create a gym with valid data', async () => {
      const body: IDataRequestCreateGym = {
        title: 'title',
        description: 'description',
        latitude: 0,
        longitude: 0,
        phone: '11910262626',
      };
      const result = await sut.create(body);

      expect(result).toEqual({
        id: expect.any(String),
        title: 'title',
        latitude: 0,
        longitude: 0,
        phone: '11910262626',
        description: 'description',
        created_at: expect.any(Date),
      });
    });

    test('should not create a duplicate gym', async () => {
      const body: IDataRequestCreateGym = {
        title: 'title',
        description: 'description',
        latitude: 0,
        longitude: 0,
        phone: '11910262626',
      };

      await sut.create(body);

      await expect(() => sut.create(body)).rejects.toThrowError(
        'Gym already exists',
      );
    });
  });
});
