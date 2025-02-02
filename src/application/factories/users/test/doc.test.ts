import { UsersDomain } from '@/application/domains/users/main';
import { beforeEach, describe, expect, test } from 'vitest';
import { FactoryUsersDomainDoc } from '../doc';

type TSutProps = 'default' | 'newRepository' | 'seedRepository';

export function makeSutUsers(type: TSutProps = 'default') {
  let sut: UsersDomain;

  switch (type) {
    case 'newRepository':
      sut = FactoryUsersDomainDoc.createWithNewRepository();
      break;
    case 'seedRepository':
      sut = FactoryUsersDomainDoc.createWithSeedRepository();
      break;
    default:
      sut = FactoryUsersDomainDoc.create();
      break;
  }

  return {
    sut,
  };
}

describe('FactoryUsersDomainDoc', () => {
  let sut: UsersDomain;

  beforeEach(() => {
    sut = makeSutUsers('newRepository').sut;
  });

  test('should create a user with valid data', async () => {
    const body = {
      name: 'name',
      email: 'email@email.com',
      password: 'password',
    };
    const result = await sut.createUser('header', body);

    expect(result).toEqual({
      user: {
        id: expect.any(String),
        name: 'name',
        email: 'email@email.com',
        password_hash: expect.any(String),
        created_at: expect.any(Date),
      },
    });
  });

  test('should create a user with valid data', async () => {
    const body = {
      name: 'name',
      email: 'email@email.com',
      password: 'password',
    };
    const result = await sut.createUser('header', body);

    expect(result).toEqual({
      user: {
        id: expect.any(String),
        name: 'name',
        email: 'email@email.com',
        password_hash: expect.any(String),
        created_at: expect.any(Date),
      },
    });
  });
});
