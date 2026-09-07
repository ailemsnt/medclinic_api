import { Roles } from "../../@common/entities/enums/roles.enum";

export class UserResponseDto {
  id!: number;
  name!: string;
  email!: string;
  role!: Roles;
  createdAt!: Date;
}