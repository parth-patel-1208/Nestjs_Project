import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3008);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();  // Enable CORS for cross-origin reque
  console.log('server is running on ', 'http://localhost:3008/');

}
bootstrap();
