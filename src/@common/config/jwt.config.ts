import { SignOptions } from "jsonwebtoken";

export const JWT_EXPIRES_IN: SignOptions['expiresIn'] = (process.env.JWT_EXPIRES_IN) as SignOptions['expiresIn'];