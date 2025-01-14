import { Module } from '@nestjs/common';
import { DocCheckInsController } from './controllers/check-ins/doc.controller.test';
import { DocUsersController } from './controllers/users/doc.controller.test';

@Module({
  imports: [],
  controllers: [DocUsersController, DocCheckInsController],
  providers: [],
})
export class DocModule {}
