import { CustomException } from '@/application/@exception/custom-exception';

interface IServiceValidationEmailPassword {
  execute(email: string, password: string): Promise<void>;
}

export class ServiceValidationEmailPassword
  implements IServiceValidationEmailPassword
{
  async execute(email: string, password: string) {
    if (!email || !password)
      throw new CustomException('Email and password are required', 400);
  }
}
