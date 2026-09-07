import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../@common/guards/jwt.guard';
import { GetUserJwt } from '../@common/decorators/get-user-jwt.decorator';
import type { AuthUserDto } from '../@common/dto/auth-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseInterceptors(ClassSerializerInterceptor)
  async getMe(@GetUserJwt() user: AuthUserDto): Promise<UserResponseDto> {
    const userMe = await this.userService.get(user.data.id);
    return new UserResponseDto(userMe);
  }
}
