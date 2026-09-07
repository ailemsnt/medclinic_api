import { JwtPayload } from 'jsonwebtoken';
import { Roles } from '../entities/enums/roles.enum';

export interface AuthUserDto extends JwtPayload {
  data: {
    id: number;
    name: string;
    email: string;
    role: Roles;
  };
}
