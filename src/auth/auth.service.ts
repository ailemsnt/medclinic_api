import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { JwtService } from './jwt/jwt.service';
import { compare, genSalt, hash } from 'bcrypt';
import { UserRepository } from '../user/user.repository';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JWT_EXPIRES_IN } from '../@common/config/jwt.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async register(user: AuthRegisterDto) {
    const existsUser = await this.userRepository.getUserByEmail(user.email);
    if (existsUser) {
      throw new ConflictException('Usuário já cadastrado');
    }

    const salt = await genSalt(10);
    const hashPassword = await hash(user.password, salt);
    return this.userRepository.register({
      ...user,
      password: hashPassword,
    });
  }

  async login(loginDto: AuthLoginDto) {
    const user = await this.userRepository.getUserByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (!(await compare(loginDto.password, user.passwordHash))) {
      throw new UnauthorizedException();
    }

    const token = this.jwtService.sign({
      id: user.id,
      role: user.role,
    });

    return { 
      token,
      user: user.id,
      role: user.role,
      expiresIn: JWT_EXPIRES_IN,
    };
  }
}
