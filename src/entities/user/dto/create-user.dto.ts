import { IsEmail, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(3)
  @MaxLength(50)
  readonly name: string;
  @IsEmail()
  readonly email: string;
  @MinLength(8)
  @MaxLength(30)
  password: string;
}
