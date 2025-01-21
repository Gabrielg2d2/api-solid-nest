import { IDataRequest } from '@/application/domains/gyms/main';
import { CreateGymsDocs } from '@/doc/gyms/create-check-ins';
import { GymsDomain } from '@/domain/gyms/main';
import { Body, Headers, Post, Res } from '@nestjs/common';
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
    const result = await this.domain.create(body);

    return reply.status(result.statusCode).send(result);
  }
}
