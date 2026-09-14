import { env } from './env.config';
import { SignOptions } from 'jsonwebtoken';

export const JWT_EXPIRES_IN: SignOptions['expiresIn'] =
  env.JWT_EXPIRES_IN as SignOptions['expiresIn'];
