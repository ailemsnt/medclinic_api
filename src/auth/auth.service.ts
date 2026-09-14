import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from './jwt/jwt.service';
import { compare, genSalt, hash } from 'bcrypt';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JWT_EXPIRES_IN } from '../@common/config/jwt.config';
import { UserService } from '../user/user.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async register(user: AuthRegisterDto): Promise<AuthResponseDto> {
    const existsUser = await this.userService.getUserByEmail(user.email);

    if (existsUser) {
      throw new ConflictException('Usuário já cadastrado');
    }

    const salt = await genSalt(10);
    const hashPassword = await hash(user.password, salt);

    return this.userService.register({
      ...user,
      password: hashPassword,
    });
  }

  async login(loginDto: AuthLoginDto) {
    const user = await this.userService.getUserByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (!(await compare(loginDto.password, user.passwordHash))) {
      throw new UnauthorizedException();
    }

    const token = this.jwtService.sign(
      {
        role: user.role,
      },
      user.id,
    );

    return {
      token,
      user: user.id,
      role: user.role,
      expiresIn: JWT_EXPIRES_IN,
    };
  }
}
