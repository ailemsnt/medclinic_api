import { Injectable } from '@nestjs/common';
import { User } from '../@common/entities/user.entity';
import { UserCreateDto } from './dto/user-create.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export abstract class UserRepository {
  abstract register(user: UserCreateDto): Promise<UserResponseDto>;

  abstract get(id: number): Promise<User | null>;

  abstract getUserByEmail(email: string): Promise<User | null>;
}
