import { Injectable } from '@nestjs/common';
import { User } from '../@common/entities/user.entity';
import { AuthRegisterDto } from '../auth/dto/auth-register.dto';

@Injectable()
export abstract class UserRepository {
  abstract register(user: AuthRegisterDto): Promise<User>;

  abstract get(id: number): Promise<User | null>;

  abstract getUserByEmail(email: string): Promise<User | null>;
}
