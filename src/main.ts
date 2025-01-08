import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  // TODO: remove the comment below to enable the Swagger documentation
  // const app = await NestFactory.create(AppModule);
  // await app.listen(process.env.PORT ?? 3333);

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('MyGym API')
    .setDescription('The MyGym API documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
