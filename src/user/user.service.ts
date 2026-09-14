import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserCreateDto } from './dto/user-create.dto';
import { User } from '../@common/entities/user.entity';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async get(id: number): Promise<User> {
    if (!id || isNaN(id)) {
      throw new UnauthorizedException(`Credenciais inválidas.`);
    }

    const user = await this.userRepository.get(id);
    if (!user) {
      throw new UnauthorizedException(`Credenciais inválidas.`);
    }

    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.getUserByEmail(email);
  }

  async register(user: UserCreateDto): Promise<UserResponseDto> {
    const createdUser = await this.userRepository.register(user);
    return plainToInstance(UserResponseDto, createdUser);
  }
}
