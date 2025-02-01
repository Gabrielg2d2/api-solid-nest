import { UsersDomain } from '@/application/domains/users/main';
import { AuthenticateUserDocs } from '@/doc/users/authenticate-user.doc';
import { CreateUserDocs } from '@/doc/users/create-user.doc';
import { ProfileUserDocs } from '@/doc/users/get-profile-user.doc';
import { ZodValidationPipe } from '@/validations/zod-validation.pipe';
import { Body, Get, Headers, Param, Post } from '@nestjs/common';
import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export const AuthenticateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type AuthenticateUserDto = z.infer<typeof AuthenticateUserSchema>;

export class BaseUsersController {
  protected domain!: UsersDomain;

  @Post('/create')
  @CreateUserDocs()
  async create(
    @Headers('header') headerValue = 'default-value',
    @Body(new ZodValidationPipe(CreateUserSchema)) body: CreateUserDto,
  ) {
    // TODO: test headerValue
    const data = await this.domain.createUser(headerValue, body);

    return {
      user: data,
    };
  }

  @Post('/session')
  @AuthenticateUserDocs()
  async authenticate(
    @Body(new ZodValidationPipe(AuthenticateUserSchema))
    body: AuthenticateUserDto,
  ) {
    const data = await this.domain.authenticateUser(body);

    return {
      user: data,
    };
  }

  @Get('/profile/:userId')
  @ProfileUserDocs()
  async getProfile(@Param('userId') userId: string) {
    const data = await this.domain.getProfile(userId);

    return {
      user: data,
    };
  }
}
