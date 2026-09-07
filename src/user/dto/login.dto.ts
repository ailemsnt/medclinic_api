import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'E-mail não informado.' })
  @IsEmail({}, { message: 'E-mail inválido.' })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim().toLocaleLowerCase() : value,
  )
  @Length(1, 150, { message: 'Tamanho inválido para o e-mail.' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'Senha não informada.' })
  password!: string;
}
