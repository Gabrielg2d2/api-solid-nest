/* eslint-disable @typescript-eslint/no-unused-vars */
import { IUserGlobal } from '@/application/@global/types/user';
import { randomUUID } from 'node:crypto';
import { IRepositoryUsers, IRequestCreateUser } from '../interface';

export class RepositoryUserTest implements IRepositoryUsers {
  private static instance: RepositoryUserTest;
  private users: IUserGlobal[] = [];

  private constructor() {}

  public static getInstance() {
    if (!RepositoryUserTest.instance) {
      RepositoryUserTest.instance = new RepositoryUserTest();
    }
    return RepositoryUserTest.instance;
  }

  // TODO: Utils test - clearAllUsers, seedUsers
  private clearAllUsers() {
    this.users = [];
  }

  private seedUsers() {
    this.users = [
      {
        id: 'test-id',
        name: 'Test User',
        email: 'test1@gmail.com',
        password_hash: 'hash_123',
        created_at: new Date('2025-09-01T00:00:00.000Z'),
      },
      {
        id: 'test-id-2',
        name: 'Test User 2',
        email: 'test2@gmail.com',
        password_hash: 'hash_123',
        created_at: new Date('2025-09-02T00:00:00.000Z'),
      },
    ];
  }
  utilsTest() {
    return {
      clearAllUsers: this.clearAllUsers.bind(this),
      seedUsers: this.seedUsers.bind(this),
    };
  }
  // TODO: Utils test - finish

  async getUserById(id: string) {
    try {
      const result = this.users.find((user) => user.id === id);
      if (!result) {
        return null;
      }

      return result;
    } catch (error) {
      throw new Error('RepositoryUserTest: Error to get user by id');
    }
  }

  async getUserByEmail(email: string) {
    return this.users.find((user) => user.email === email) || null;
  }

  async createUser(data: IRequestCreateUser) {
    try {
      const user: IUserGlobal = {
        id: randomUUID(),
        name: data.name,
        email: data.email,
        password_hash: data.password,
        created_at: new Date(),
      };

      this.users.push(user);

      return user;
    } catch (error) {
      throw new Error('RepositoryUserTest: Error to create user');
    }
  }
}
