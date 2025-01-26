import { GymsDomain, IDataRequest } from '@/application/domains/gyms/main';
import { CreateGymsDocs } from '@/doc/gyms/create-check-ins';
import { GetGymsDocs } from '@/doc/gyms/get-gym-check-ins';
import { Body, Get, Headers, Param, Post } from '@nestjs/common';

export class BaseGymsController {
  protected domain!: GymsDomain;

  @Post('/create')
  @CreateGymsDocs()
  async create(
    @Headers('header') headerValue = 'default-value',
    @Body() body: IDataRequest,
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
