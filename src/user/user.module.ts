import { Module } from '@nestjs/common';
import { JwtModule } from '../auth/jwt/jwt.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import {
  TYPEORM_USER_REPOSITORY,
  UserTypeOrmRepository,
} from './user-typeorm.repository';
import { AppDataSource } from '../@common/database/typeorm/typeorm';
import { User } from '../@common/entities/user.entity';

@Module({
  imports: [JwtModule],
  controllers: [UserController],
  providers: [
    UserService,
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
  exports: [UserService],
})
export class UserModule {}
