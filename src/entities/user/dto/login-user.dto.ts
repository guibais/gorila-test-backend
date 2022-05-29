import { IsEmail, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  readonly email: string;
  @MinLength(8)
  @MaxLength(30)
  @IsNotEmpty()
  password: string;
}
