import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '../auth/jwt.service';
import { CreateUserDto } from './dto/create-user.dto';
import { compare, genSalt, hash } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async create(user: CreateUserDto) {
    const existsUser = await this.userRepository.getUserByEmail(user.email);
    if (existsUser) {
      throw new ConflictException('Usuário já cadastrado');
    }

    const salt = await genSalt(10);
    const hashPassword = await hash(user.password, salt);
    return this.userRepository.create({
      ...user,
      password: hashPassword,
    });
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.getUserByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (!(await compare(loginDto.password, user.passwordHash))) {
      throw new UnauthorizedException();
    }

    const jwt = this.jwtService.sign({
      id: user.id,
      role: user.role,
    });

    return { jwt };
  }

  async get(id: number) {
    const user = await this.userRepository.get(id);
    if (!user) {
      throw new NotFoundException(`Usuário ${id} não encontrado;`);
    }

    return user;
  }
}
