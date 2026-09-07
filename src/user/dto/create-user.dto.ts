import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { Roles } from "../../@common/entities/enums/roles.enum";
import { Transform } from "class-transformer";

export class CreateUserDto {
  @IsString()
  @Transform(({value}) => typeof value === "string" ? value?.trim() : value)
  @IsNotEmpty({message: "Nome não informado."})
  @MinLength(6, {message: "Tamanho mínimo inválido para o nome."})
  @MaxLength(100, {message: "O nome pode ter no máximo 100 caracteres."})
  name!: string;

  @Transform(({ value}) => value?.trim().toLowerCase())
  @IsNotEmpty({message: "E-mail não informado."})
  @IsEmail({}, {message: "E-mail inválido."})
  email!: string;

  @IsString() 
  @Transform(({value}) => typeof value === "string" ? value?.trim() : value)
  @IsNotEmpty({message: "Senha não informada."})
  @MinLength(6, {message: "Tamanho mínimo inválido para a senha."})
  @MaxLength(50, {message: "Tamanho máximo inválido para a senha."})
  password!: string;

  @IsOptional()
  @IsEnum(Roles, {message: "Perfil incorreto."})
  role?: Roles;
}