import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../@common/entities/user.entity';
import { UserCreateDto } from './dto/user-create.dto';
import { UserRepository } from './user.repository';
import { UserResponseDto } from './dto/user-response.dto';

export const TYPEORM_USER_REPOSITORY = 'TYPEORM_USER_REPOSITORY' as const;

@Injectable()
export class UserTypeOrmRepository implements UserRepository {
  constructor(
    @Inject(TYPEORM_USER_REPOSITORY)
    private readonly repository: Repository<User>,
  ) {}

  async getUserByEmail(
    email: string,
  ): Promise<(User & { passwordHash: string }) | null> {
    return this.repository.findOne({
      select: {
        passwordHash: true,
        name: true,
        email: true,
        role: true,
        id: true,
      },
      where: {
        email,
      },
    });
  }

  async get(id: number): Promise<User | null> {
    return this.repository.findOneBy({ id });
  }

  async register(user: UserCreateDto): Promise<UserResponseDto> {
    const userEntity = this.repository.create({
      name: user.name,
      email: user.email,
      passwordHash: user.password,
    });
    const savedUser = await this.repository.save(userEntity);

    return savedUser;
  }
}
