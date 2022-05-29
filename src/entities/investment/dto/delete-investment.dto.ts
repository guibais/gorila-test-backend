import { UserSchema } from 'src/entities/user/schema/user.schema';
import { IsNotEmpty } from 'class-validator';

export class DeleteUserInvestmentDto {
  constructor({ id, user }) {
    this.id = id;
    this.user = user;
  }

  @IsNotEmpty()
  readonly id: number;

  user: UserSchema;
}
