import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome não informado.' })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @Length(6, 100, { message: 'Tamanho mínimo inválido para o nome.' })
  name!: string;

  @IsNotEmpty({ message: 'E-mail não informado.' })
  @IsEmail({}, { message: 'E-mail inválido.' })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim().toLocaleLowerCase() : value,
  )
  @Length(1, 150, { message: 'Tamanho inválido para o e-mail.' })
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
