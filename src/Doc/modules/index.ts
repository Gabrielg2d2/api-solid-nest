import { Module } from '@nestjs/common';
import { DocUsersController } from '../controllers/doc-users.controller';

@Module({
  imports: [],
  controllers: [DocUsersController],
  providers: [],
})
export class DocModule {}
