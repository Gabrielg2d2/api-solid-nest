import { AdapterPrisma } from '@/domain/@adapters/repository/prisma';
import { Disconnect } from '@/domain/@decorators/disconnect';
import { IRepositoryUsers, IRequestCreateUser } from '../interface';

export class RepositoryUsers implements IRepositoryUsers {
  constructor(private readonly adapter = new AdapterPrisma()) {}

  @Disconnect()
  async getUserById(id: string) {
    const result = await this.adapter.prisma.user.findUnique({
      where: { id },
    });
    return result;
  }

  @Disconnect()
  async getUserByEmail(email: string) {
    const result = await this.adapter.prisma.user.findUnique({
      where: { email },
    });
    return result;
  }

  @Disconnect()
  async createUser(data: IRequestCreateUser) {
    const result = await this.adapter.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password_hash: data.password,
      },
    });
    return result;
  }
}
