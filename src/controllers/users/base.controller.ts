import { UsersDomain } from '@/application/domains/users/main';
import { AuthenticateUserDocs } from '@/doc/users/authenticate-user.doc';
import { CreateUserDocs } from '@/doc/users/create-user.doc';
import { ProfileUserDocs } from '@/doc/users/get-profile-user.doc';
import { ZodValidationPipe } from '@/validations/zod-validation.pipe';
import { Body, Get, Param, Post } from '@nestjs/common';
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

export const ProfileUserIdSchema = z.string();

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type AuthenticateUserDto = z.infer<typeof AuthenticateUserSchema>;

export class BaseUsersController {
  protected domain!: UsersDomain;

  @Post('/create')
  @CreateUserDocs()
  async create(
    @Body(new ZodValidationPipe(CreateUserSchema)) body: CreateUserDto,
  ) {
    return await this.domain.createUser(body);
  }

  @Post('/session')
  @AuthenticateUserDocs()
  async authenticate(
    @Body(new ZodValidationPipe(AuthenticateUserSchema))
    body: AuthenticateUserDto,
  ) {
    return await this.domain.authenticateUser(body);
  }

  @Get('/profile/:userId')
  @ProfileUserDocs()
  async getProfile(
    @Param('userId', new ZodValidationPipe(ProfileUserIdSchema)) userId: string,
  ) {
    return await this.domain.getProfile(userId);
  }
}
