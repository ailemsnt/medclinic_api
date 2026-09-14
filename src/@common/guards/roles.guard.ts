import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../entities/enums/roles.enum';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { getUserJwt } from '../decorators/get-user-jwt.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Roles[]>(ROLES_KEY, context.getHandler());
    if (!roles) {
      throw new ForbiddenException(
        'Acesso negado. Você não tem permissão para acessar este recurso.',
      );
    }

    const userJwt = getUserJwt(context);

    if (!roles.includes(userJwt.data.role)) {
      throw new ForbiddenException('Acesso negado.');
    }

    return true;
  }
}
