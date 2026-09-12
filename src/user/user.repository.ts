import { Injectable } from '@nestjs/common';
import { User } from '../@common/entities/user.entity';
import { UserCreateDto } from './dto/user-create.dto';

@Injectable()
export abstract class UserRepository {
  abstract register(user: UserCreateDto): Promise<User>;

  abstract get(id: number): Promise<User | null>;

  abstract getUserByEmail(email: string): Promise<User | null>;
}