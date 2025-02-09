import { CustomException } from '@/application/@exception/custom-exception';
import { CheckInDomain } from '@/application/domains/checkins/main';
import { UsersDomain } from '@/application/domains/users/main';
import { beforeEach, describe, expect, test } from 'vitest';
import { FactoryUsersDomainDoc } from '../../users/doc';
import { FactoryCheckInsDomainDoc } from '../doc';

describe('FactoryCheckInsDomainDoc', () => {
  let sut: CheckInDomain;
  let domainUser: UsersDomain;

  beforeEach(() => {
    sut = FactoryCheckInsDomainDoc.create();
    domainUser = FactoryUsersDomainDoc.create();
  });

  describe('To be defined', () => {
    test('should be defined', () => {
      expect(sut).toBeDefined();
    });

    test('should have a method create CheckIn', () => {
      expect(sut.create).toBeDefined();
    });

    test('should have a method fetchHistoryCheckIns', () => {
      expect(sut.fetchHistoryCheckIns).toBeDefined();
    });
  });

  describe('Create CheckIn', () => {
    test('should throw CustomException when gym is not found', async () => {
      const requestDataInvalid = {
        gymId: '1',
        userId: '1',
        userLatitude: 1,
        userLongitude: 1,
      };

      try {
        await sut.create(requestDataInvalid);
      } catch (error) {
        if (error instanceof CustomException) {
          expect(error.getStatus()).toBe(400);
          expect(error.message).toBe('Gym not found');
        }
      }
    });

    // TODO: Fix this test
    // test('should check-in successfully', async () => {
    //   const user = await domainUser.createUser('test-id-user', {
    //     email: 'testuser@gmail.com',
    //     name: 'Test User',
    //     password: '123456',
    //   });

    //   console.log('user => ', user);

    //   const checkIn = await sut.create({
    //     gymId: 'test-id',
    //     userId: user?.id as string,
    //     userLatitude: 200,
    //     userLongitude: 200,
    //   });

    //   console.log(
    //     'checkIn => ',
    //     await sut.fetchHistoryCheckIns(user?.id as string),
    //   );

    //   expect(checkIn).toEqual({
    //     created_at: expect.any(Date),
    //     gym_id: expect.any(String),
    //     id: expect.any(String),
    //     user_id: expect.any(String),
    //     validated_at: null,
    //   });
    // });
  });

  describe('fetchHistoryCheckIns', () => {
    test('should return a list of checkins', async () => {
      const historyCheckIns = await sut.fetchHistoryCheckIns('test-id');

      expect(historyCheckIns).toEqual([
        {
          created_at: new Date('2025-09-01T00:00:00.000Z'),
          gym_id: 'test-id',
          id: 'test-id',
          user_id: 'test-id',
          validated_at: null,
        },
      ]);
    });
  });
});
