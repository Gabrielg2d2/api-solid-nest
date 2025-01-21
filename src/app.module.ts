import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CheckInsController } from './controllers/check-ins/check-ins.controller';
import { GymsController } from './controllers/gyms/check-ins.controller';
import { UsersController } from './controllers/users/users.controller';
import { ValidateHeaderMiddleware } from './middlewares/header';

@Module({
  imports: [],
  controllers: [UsersController, CheckInsController, GymsController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateHeaderMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
