import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4, { message: 'Имя пользователя должно быть длиннее 4х символов' })
  @MaxLength(16, {
    message: 'Имя пользователя не должно быть длинной более 16ти символов',
  })
  username: string;

  @IsString()
  @MinLength(8, { message: 'Пароль должен быть длиннее 8ми символов' })
  @MaxLength(32, { message: 'Пароль не должен быть длиннее 32х символов' })
  @Matches(/((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Пароль слишком простой',
  })
  password: string;
}
