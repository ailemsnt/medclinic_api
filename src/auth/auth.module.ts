import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from '../user/user.repository';
import {
  TYPEORM_USER_REPOSITORY,
  UserTypeOrmRepository,
} from '../user/user-typeorm.repository';
import { JwtModule } from './jwt/jwt.module';
import { AppDataSource } from '../@common/database/typeorm/typeorm';
import { User } from '../@common/entities/user.entity';

@Module({
  imports: [JwtModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: UserRepository, // Quando pedir a porta
      useClass: UserTypeOrmRepository, // Usar a implementação
    },
    {
      provide: TYPEORM_USER_REPOSITORY,
      useFactory() {
        return AppDataSource.getRepository(User);
      },
    },
  ],
})
export class AuthModule {}
