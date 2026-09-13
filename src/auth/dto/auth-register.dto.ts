import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class AuthRegisterDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome não informado.' })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @Length(2, 100, { message: 'Tamanho inválido para o nome.' })
  @Matches(/^[^\d\s\p{P}\p{S}'\-]+(?: [^\d\s\p{P}\p{S}'\-]+)*$/u, {
  message: 'O nome contém caracteres inválidos.',})//essa regex permite nomes escritos em outros idiomas
  name!: string;

  @IsNotEmpty({ message: 'E-mail não informado.' })
  @IsEmail({}, { message: 'Formato de e-mail inválido.' })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim().toLocaleLowerCase() : value,
  )
  @Length(7, 150, { message: 'Tamanho inválido para o e-mail.' })
  email!: string;

  @IsString({ message: 'Formato do senha informado inválido' })
  @IsNotEmpty({ message: 'Senha não informada.' })
  @Length(8, 75, { message: 'Tamanho mínimo ou máximo inválido para a senha.' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,75}$/, {
    message:
      'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
  })
  password!: string;
}