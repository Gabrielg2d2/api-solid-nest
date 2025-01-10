import { Module } from '@nestjs/common';
import { DocUsersController } from './controllers/users/doc-users.controller.test';

@Module({
  imports: [],
  controllers: [DocUsersController],
  providers: [],
})
export class DocModule {}
