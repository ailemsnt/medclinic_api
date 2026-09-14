import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { AuthUserDto } from '../dto/auth-user.dto';

export const GetUserJwt = createParamDecorator(
  (data: keyof AuthUserDto | undefined, ctx: ExecutionContext): any => {
    const user = getUserJwt(ctx);

    // Se uma propriedade específica foi pedida e o usuário existe, retorna apenas ela
    if (data && user) {
      return user[data];
    }

    return user;
  },
);

export function getUserJwt(ctx: ExecutionContext): AuthUserDto {
  const request = ctx
    .switchToHttp()
    .getRequest<Request & { user?: AuthUserDto }>();
  return request['user'] as AuthUserDto;
}
