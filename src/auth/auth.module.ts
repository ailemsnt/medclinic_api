import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from '../user/user.repository';
import {
  TYPEORM_USER_REPOSITORY,
  UserTypeOrmRepository,
} from '../user/user-typeorm.repository';
import { AppDataSource } from '../@common/database/typeorm/typeorm';
import { User } from '../@common/entities/user.entity';
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