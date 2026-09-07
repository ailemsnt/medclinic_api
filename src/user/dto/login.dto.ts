import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {
  @Transform(({ value}) => value?.trim().toLowerCase())
  @IsNotEmpty({message: "E-mail não informado."})
  @IsEmail({}, {message: "E-mail inválido."})
  email!: string;

  @IsString() 
  @Transform(({value}) => typeof value === "string" ? value?.trim() : value)
  @IsNotEmpty({message: "Senha não informada."})
  @MinLength(6, {message: "Tamanho mínimo inválido para a senha."})
  password!: string;
}