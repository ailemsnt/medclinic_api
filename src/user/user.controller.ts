import { Controller, Get, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtGuard } from "../@common/guards/jwt.guard";
//import { UserResponseDto } from "./dto/user-response.dto";
import { GetUserJwt } from "../@common/decorators/get-user-jwt.decorator";
import type { AuthUserDto } from "../@common/dto/auth-user.dto";

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async getMe(
    @GetUserJwt() user: AuthUserDto,) {
    //const user  = await this.userService.get(req.user!.id);
    return this.userService.get(user.data.id)
      // name: user.name,
      // email: user.email,
      // role: user.role,
      // id: user.id,
      // createdAt: user.createdAt,
    ;
  }
}
