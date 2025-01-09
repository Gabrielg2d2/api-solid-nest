import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

function getNodeEnv() {
  const key = process.env.NODE_ENV;

  switch (key) {
    case 'test':
      return {
        title: 'MyGym API - TEST',
        name: 'test',
        port: 4000,
        description: 'The MyGym API documentation, for testing purposes',
      };
    case 'development':
      return {
        title: 'MyGym API - DEV',
        name: 'development',
        port: process.env.PORT || 3333,
        description: 'The MyGym API documentation, for development purposes',
      };
    default:
      return {
        title: 'MyGym API - PROD',
        name: 'production',
        port: process.env.PORT || 3333,
        description: 'The MyGym API documentation, for production purposes',
      };
  }
}

async function bootstrap() {
  const { title, port, description } = getNodeEnv();
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
