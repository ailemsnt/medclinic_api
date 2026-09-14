import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '../../auth/jwt/jwt.service';
import { Request } from 'express';
import { AuthUserDto } from '../dto/auth-user.dto';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  private extractToken(context: ExecutionContext): string {
    const expressReq = context.switchToHttp().getRequest<Request>();

    const authHeader = expressReq.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Token não informado');
    }

    const [bearerString, token] = authHeader.split(' ');

    if (!token || bearerString !== 'Bearer') {
      throw new UnauthorizedException('Token inválido');
    }

    return token;
  }

  private setPayload(context: ExecutionContext, payload: AuthUserDto) {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: AuthUserDto }>();
    request.user = payload;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const payload = this.jwtService.verify(this.extractToken(context));
    if (payload.iss !== 'sctec') {
      throw new UnauthorizedException('Token inválido');
    }
    this.setPayload(context, payload);
    return true;
  }
}
