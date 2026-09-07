import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../@common/guards/jwt.guard';
import { RolesGuard } from '../@common/guards/roles.guard';
import { Roles } from '../@common/entities/enums/roles.enum';
import { RolesAllowed } from '../@common/decorators/roles.decorator';

@Controller('admin')
export class AdminController {
  @Get('ping')
  @UseGuards(JwtGuard, RolesGuard)
  @RolesAllowed(Roles.ADMIN)
  ping() {
    return {
      message: 'Acesso permitido para ADMIN',
    };
  }
}
