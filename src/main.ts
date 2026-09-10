import { env } from './@common/config/env.config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initDatabase } from './@common/database/typeorm/typeorm';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  await initDatabase();

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(env.PORT ?? 3000);
  console.log();
}
bootstrap().catch(console.error);