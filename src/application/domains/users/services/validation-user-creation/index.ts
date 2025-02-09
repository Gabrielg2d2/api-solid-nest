import { AdapterZod } from '@/application/@adapters/validation/zod';
import { CustomException } from '@/application/@exception/@root-exception';

type IDataRequest = {
  name: string;
  email: string;
  password: string;
};

interface IServiceValidationCreateUser {
  execute(body: IDataRequest): Promise<void>;
}

export class ServiceValidationCreateUser
  implements IServiceValidationCreateUser
{
  constructor(private readonly adapterValidation = new AdapterZod()) {}

  private readonly registerBodySchema = this.adapterValidation.zod.object({
    name: this.adapterValidation.zod.string().min(3),
    email: this.adapterValidation.zod.string().email(),
    password: this.adapterValidation.zod.string().min(6),
  });

  public async execute(body: IDataRequest) {
    const isBodyValid = this.registerBodySchema.safeParse(body);

    if (!isBodyValid.success) {
      throw new CustomException('Invalid content', 400);
    }
  }
}
