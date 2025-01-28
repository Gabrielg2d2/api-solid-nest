import { GymsDomain } from '@/application/domains/gyms/main';
import { CreateGymsDocs } from '@/doc/gyms/create-check-ins';
import { GetGymsDocs } from '@/doc/gyms/get-gym-check-ins';
import { ZodValidationPipe } from '@/validations/zod-validation.pipe';
import { Body, Get, Headers, Param, Post } from '@nestjs/common';
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
    @Headers('header') headerValue = 'default-value',
    @Body(new ZodValidationPipe(CreateGymSchema)) body: CreateGymDto,
  ) {
    console.log('Header value: ', headerValue);
    const data = await this.domain.create(body);

    return {
      gym: data,
    };
  }

  @Get('/gyms/:id')
  @GetGymsDocs()
  async getProfile(
    @Headers('header') headerValue = 'default-value',
    @Param('id') id: string,
  ) {
    console.log('Header value: ', headerValue);
    const data = await this.domain.findGym(id);

    return {
      gym: data,
    };
  }
}
