import { GymsDomain, IDataRequest } from '@/application/domains/gyms/main';
import { CreateGymsDocs } from '@/doc/gyms/create-check-ins';
import { GetGymsDocs } from '@/doc/gyms/get-gym-check-ins';
import { Body, Get, Headers, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';

export class BaseGymsController {
  protected domain!: GymsDomain;

  @Post('/create')
  @CreateGymsDocs()
  async create(
    @Headers('header') headerValue = 'default-value',
    @Body() body: IDataRequest,
    @Res() reply: Response,
  ) {
    console.log('Header value: ', headerValue);
    const data = await this.domain.create(body);

    return reply.send(data);
  }

  @Get('/gyms/:id')
  @GetGymsDocs()
  async getProfile(
    @Headers('header') headerValue = 'default-value',
    @Param('id') id: string,
    @Res() reply: Response,
  ) {
    console.log('Header value: ', headerValue);
    const data = await this.domain.findGym(id);

    return reply.send(data);
  }
}
