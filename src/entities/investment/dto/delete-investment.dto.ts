import { UserSchema } from 'src/entities/user/schema/user.schema';
import { IsNotEmpty } from 'class-validator';

export class DeleteUserInvestmentDto {
  @IsNotEmpty()
  readonly id: number;

  user: UserSchema;
}
