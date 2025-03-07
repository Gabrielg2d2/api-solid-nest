import { GymsDomain } from '@/application/domains/gyms/main';
import { CreateGymsDocs } from '@/doc/gyms/create-check-ins';
import { GetGymsDocs } from '@/doc/gyms/get-gym-check-ins';
import { ZodValidationPipe } from '@/validations/zod-validation.pipe';
import { Body, Get, Param, Post } from '@nestjs/common';
import { z } from 'zod';

export const CreateGymSchema = z.object({
  title: z.string(),
  description: z.string(),
  phone: z.string(), //TODO: add phone validation
  latitude: z.number(),
  longitude: z.number(),
});

export const GetGymSchema = z.object({
  id: z.string().uuid(),
});

export type CreateGymDto = z.infer<typeof CreateGymSchema>;
export type GetGymDto = z.infer<typeof GetGymSchema>;

export class BaseGymsController {
  protected domain!: GymsDomain;

  @Post('/create')
  @CreateGymsDocs()
  async create(
    @Body(new ZodValidationPipe(CreateGymSchema)) body: CreateGymDto,
  ) {
    return await this.domain.create(body);
  }

  @Get('/gyms/:id')
  @GetGymsDocs()
  async getProfile(@Param('id') id: string) {
    return await this.domain.findGym(id);
  }
}
