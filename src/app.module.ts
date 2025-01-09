import { Module } from '@nestjs/common';
import { UsersController } from './controllers/user.controller/users.controller';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}
