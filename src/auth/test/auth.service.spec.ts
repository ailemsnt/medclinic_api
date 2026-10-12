import {
  expect,
  it,
  describe,
  beforeAll,
  jest,
} from '@jest/globals';
import { Roles } from './../../@common/entities/enums/roles.enum';
import { UserService } from "../../user/user.service";
import { AuthRegisterDto } from "../dto/auth-register.dto";
import { AuthResponseDto } from '../dto/auth-response.dto';
import { User } from '../../@common/entities/user.entity';
import { AuthService } from '../auth.service';
import { JwtService } from '../jwt/jwt.service';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { AuthLoginDto } from '../dto/auth-login.dto';

class UserServiceMock implements Partial<UserService>{
  private memoryDb = new Map<number, User>();

  private idSequence = 0;

  async register(user: AuthRegisterDto): Promise<AuthResponseDto>{
    const userEntity = new User();
    userEntity.id = ++this.idSequence;
    userEntity.name = user.name;
    userEntity.email = user.email;
    userEntity.passwordHash = user.password;
    userEntity.role = Roles.ATTENDANT;
    userEntity.createdAt = new Date();

    this.memoryDb.set(userEntity.id, userEntity);

    return {
      id: userEntity.id,
      name: userEntity.name,
      email: userEntity.email,
      role: userEntity.role,
      createdAt: userEntity.createdAt
    };
  }

  async getUserByEmail(email: string): Promise<User | null>{
    for (const user of this.memoryDb.values()){
      if (user.email === email){
        return user;
      }
    }
    return null;
  }
}

jest.mock('bcrypt',() => {
  return {
    genSalt: jest.fn<() => Promise<string>>().mockResolvedValue('salt'),
    hash: jest.fn().mockImplementation((password) => {
      return Promise.resolve(`hashed-${password}`);        
    }),
    compare: jest.fn().mockImplementation((password, hash) => {
      return Promise.resolve(hash === `hashed-${password}`);
    }),
  }
});

describe(AuthService.name, () => {
  const userServiceMock = new UserServiceMock();
  const userService = userServiceMock as unknown as UserService;

  beforeAll(async () =>  {
    await userServiceMock.register({
      name: 'Joao Maria',
      email: 'joao@mail.com',
      password: '123456'
    });
  });


  describe('register', () => {
    it('should register a new user', async () => {
      const jwtServiceMock = {
        sign: jest.fn().mockReturnValue('meutoken'),
      } as unknown as JwtService;

      const service = new AuthService(jwtServiceMock, userService,);

      const dto: AuthRegisterDto = {
        name: 'Joao Maria',
        email: 'joaom@mail.com',
        password: '123456'
      };

      const result = await service.register(dto);

      expect(result).toEqual(
        expect.objectContaining({
          id: 2,
          name: 'Joao Maria',
          email: 'joaom@mail.com'
        })
      );
    });

    it('should throw a conflict if user exists', async () => {
      const jwtServiceMock = {
        sign: jest.fn().mockReturnValue('meutoken'),
      } as unknown as JwtService;

      const service = new AuthService(jwtServiceMock, userService);

      const dto: AuthRegisterDto = {
        name: 'Joao Maria',
        email: 'joao@mail.com',
        password: '123456'
      };

      const error = await service.register(dto).catch((error) => error as ConflictException);

      expect(error).toBeInstanceOf(ConflictException);
    });
  });

  describe('login', () => {
    it('should login a user', async () => {
      const jwtServiceMock = {
        sign: jest.fn().mockReturnValue('meutoken'),
      } as unknown as JwtService;

      const service = new AuthService(jwtServiceMock, userService);

      const dto: AuthLoginDto = {
        email: 'joaom@mail.com',
        password: '123456'
      };

      const result = await service.login(dto);

      expect(result).toEqual({
        token: 'meutoken',
        user: 2,
        role: Roles.ATTENDANT,
        expiresIn: expect.anything(),
      });
    });

    it('should throw a unauthorized user if not exists', async () => {
      const jwtServiceMock = {
        sign: jest.fn().mockReturnValue('meutoken'),
      } as unknown as JwtService;

      const service = new AuthService(jwtServiceMock, userService);

      const dto: AuthLoginDto = {
        email: 'joao1@mail.com',
        password: '123456'
      };

      const error = await service.login(dto).catch((error) => error as UnauthorizedException);

      expect(error).toBeInstanceOf(UnauthorizedException);
    });

    it('should throw a unauthorized password is invalid', async () => {
      const jwtServiceMock = {
        sign: jest.fn().mockReturnValue('token'),
      } as unknown as JwtService;

      const service = new AuthService(jwtServiceMock, userService);

      const dto: AuthLoginDto = {
        email: 'joao@mail.com',
        password: '1234576'
      };

      const error = await service.login(dto).catch((error) => error as UnauthorizedException);

      expect(error).toBeInstanceOf(UnauthorizedException);
    });
  });
});