import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';

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
}
