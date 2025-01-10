import { DocUsersController } from '@/controllers/user.controller/doc-users.controller.test';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [DocUsersController],
  providers: [],
})
export class DocModule {}
