import { JwtPayload } from 'jsonwebtoken';
import { Roles } from '../entities/enums/roles.enum';

export interface AuthUserDto extends JwtPayload {
  data: {
    role: Roles;
  };
}
