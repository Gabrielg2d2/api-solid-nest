import { GymsDomain, IDataRequest } from '@/application/domains/gyms/main';
import { CreateGymsDocs } from '@/doc/gyms/create-check-ins';
import { GetGymsDocs } from '@/doc/gyms/get-gym-check-ins';
import { Presenter } from '@/presenter';
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

    const response = Presenter.successResponse({ gym: data }, 201);

    return reply.status(response.statusCode).send(response);
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

    const response = Presenter.successResponse({ gym: data }, 200);

    return reply.status(response.statusCode).send(response);
  }
}
