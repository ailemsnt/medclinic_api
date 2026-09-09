import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '../auth/jwt/jwt.module';

@Module({
  imports: [JwtModule, UserModule],
  controllers: [AdminController],
})
export class AdminModule {}
