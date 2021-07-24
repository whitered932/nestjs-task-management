import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    title: 'Username',
    description: 'Username',
    example: 'whitered932',
    nullable: false,
    maxLength: 16,
    minLength: 4,
    required: true,
  })
  @IsString()
  @MinLength(4, { message: 'Username must be longer then 4 chars' })
  @MaxLength(16, {
    message: 'Username must not be longer than 16 chars',
  })
  username: string;

  @ApiProperty({
    title: 'Password',
    description: 'User password',
    nullable: false,
    example: 'Sup3rP@ss!',
    minLength: 16,
    maxLength: 32,
    required: true,
    pattern: `/(?:(?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$/`,
  })
  @IsString()
  @MinLength(8, { message: 'Password must be longer that 8 chars' })
  @MaxLength(32, { message: 'Password must not be longer that 32 chars' })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  password: string;
}
