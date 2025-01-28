import { Module } from '@nestjs/common';
import { DocCheckInsController } from './controllers/check-ins/doc';
import { DocGymsController } from './controllers/gyms/doc';
import { DocUsersController } from './controllers/users/doc';

@Module({
  imports: [],
  controllers: [DocUsersController, DocCheckInsController, DocGymsController],
  providers: [],
})
export class DocModule {}
