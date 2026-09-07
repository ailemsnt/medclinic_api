import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './@common/filters/http-exception.filter';
import { BadRequestExceptionFilter } from './@common/filters/bad-request-exception.filter';

@Module({
  imports: [UserModule, AdminModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: BadRequestExceptionFilter,
    },
  ]
})
export class AppModule {}
