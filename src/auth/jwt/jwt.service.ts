import { Injectable } from '@nestjs/common';
import { JwtPayload, sign, verify, TokenExpiredError } from 'jsonwebtoken';
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
import { JWT_EXPIRES_IN } from '../../@common/config/jwt.config';
import { AuthUserDto } from '../../@common/dto/auth-user.dto';

@Injectable()
export class JwtService {
  sign(payload: object) {
    if (!process.env.JWT_SECRET || !process.env.JWT_CIPHER_KEY) {
      throw new Error('JWT_SECRET not set');
    }

    const iv = randomBytes(12);
    const cipher = createCipheriv(
      'aes-256-gcm',
      Buffer.from(process.env.JWT_CIPHER_KEY, 'hex'),
      iv,
    );

    const cipheredPayload = Buffer.concat([
      cipher.update(JSON.stringify(payload)),
      cipher.final(),
    ]);

    const tag = cipher.getAuthTag();

    return sign(
      {
        data: cipheredPayload.toString('base64url'),
        tag: tag.toString('base64url'),
        iv: iv.toString('base64url'),
      },
      process.env.JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
        issuer: 'sctec',
      },
    );
  }

  verify(jwt: string): AuthUserDto {
    if (!process.env.JWT_SECRET || !process.env.JWT_CIPHER_KEY) {
      throw new Error('JWT_SECRET not set');
    }

    try {
      const payload = verify(jwt, process.env.JWT_SECRET) as JwtPayload;

      const cipher = createDecipheriv(
        'aes-256-gcm',
        Buffer.from(process.env.JWT_CIPHER_KEY, 'hex'),
        Buffer.from(payload.iv as string, 'base64url'),
      );

      cipher.setAuthTag(Buffer.from(payload.tag as string, 'base64url'));

      const buffer = Buffer.from(payload.data as string, 'base64url');

      const decipheredPayload = Buffer.concat([
        cipher.update(buffer),
        cipher.final(),
      ]);

      return {
        ...payload,
        data: JSON.parse(
          decipheredPayload.toString('utf-8'),
        ) as AuthUserDto['data'],
      };
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new Error('Token expirado.');
      }
      throw new Error('Token inválido.');
    }
  }
}