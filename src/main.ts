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
      };
    case 'development':
      return {
        title: 'MyGym API - DEV',
        name: 'development',
        port: process.env.PORT || 3333,
      };
    default:
      return {
        title: 'MyGym API - PROD',
        name: 'production',
        port: process.env.PORT || 3333,
      };
  }
}

async function bootstrap() {
  const { title, port } = getNodeEnv();
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription('The MyGym API documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
