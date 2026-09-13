import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtService } from './jwt/jwt.service';
@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    JwtService,
    AuthService,
  ],
})
export class AuthModule {}