import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { AppModule } from './app.module';
import { DocModule } from './doc.module';
import { HttpExceptionFilter } from './filters/http-exception-filter';
import { ResponseInterceptor } from './filters/response.interceptor';

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

  writeFileSync('./swagger.json', JSON.stringify(document, null, 2));

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(port);
}
bootstrap();
