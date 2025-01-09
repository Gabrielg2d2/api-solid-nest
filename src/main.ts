import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const isTest = process.env.NODE_ENV === 'test';
  const app = await NestFactory.create(AppModule);

  const title = isTest ? '** MyGym API-Test **' : 'MyGym API';

  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription('The MyGym API documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = isTest ? 4000 : process.env.PORT || 3333;
  await app.listen(port);
}
bootstrap();
