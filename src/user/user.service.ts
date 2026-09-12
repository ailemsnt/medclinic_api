import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserCreateDto } from './dto/user-create.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async get(id: number) {
    const user = await this.userRepository.get(id);
    if (!user) {
      throw new UnauthorizedException(`Credenciais inválidas.`);
    }

    return user;
  }

  async getUserByEmail(email: string) {
    return this.userRepository.getUserByEmail(email);
  }

  async register (user: UserCreateDto) {
    return this.userRepository.register(user);
  }
}
