import { Exclude, Expose } from 'class-transformer';
import { Roles } from '../../@common/entities/enums/roles.enum';

@Exclude()
export class AuthResponseDto {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  email!: string;

  @Expose()
  role!: Roles;

  @Expose()
  createdAt!: Date;

  constructor(partial: Partial<AuthResponseDto>) {
    Object.assign(this, partial);
  }
}