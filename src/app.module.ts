import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { ValidateHeaderMiddleware } from './middlewares/header';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateHeaderMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
