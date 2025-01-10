import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DocModule } from './doc.module';

function getNodeEnv() {
  const key = process.env.NODE_ENV;

  switch (key) {
    case 'test':
      return {
        title: 'MyGym API - Test In Memory',
        environment: 'test',
        port: 4000,
        description: 'The MyGym API documentation, for testing purposes',
      };
    case 'development':
      return {
        title: 'MyGym API - DEV',
        environment: 'development',
        port: process.env.PORT || 3333,
        description: 'The MyGym API documentation, for development purposes',
      };
    default:
      return {
        title: 'MyGym API - PROD',
        environment: 'production',
        port: process.env.PORT || 3333,
        description: 'The MyGym API documentation, for production purposes',
      };
  }
}

async function bootstrap() {
  const { title, port, description, environment } = getNodeEnv();

  const module = environment === 'test' ? DocModule : AppModule;
  const app = await NestFactory.create(module);

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
