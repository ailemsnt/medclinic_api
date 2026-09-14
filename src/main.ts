import { env } from './@common/config/env.config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initDatabase } from './@common/database/typeorm/typeorm';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { BadRequestExceptionFilter } from './@common/filters/bad-request-exception.filter';

async function bootstrap() {
  await initDatabase();

  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new BadRequestExceptionFilter(httpAdapter));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: () => {
        return new BadRequestException('Estrutura da requisição inválida.');
      }
    }),
  );
  await app.listen(env.PORT ?? 3000);
}
bootstrap().catch(console.error);
