import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { LoginDto } from "../user/dto/login.dto";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Post('register')
  async register(@Body() registerDto: CreateUserDto) {
    return this.userService.create(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }
}