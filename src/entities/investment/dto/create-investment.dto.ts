import { UserSchema } from 'src/entities/user/schema/user.schema';
import { InvestmentType } from '../schema/investment.schema';
import { IsNotEmpty } from 'class-validator';

export class CreateInvestmentDto {
  constructor({ type, value, date, user }) {
    this.type = type;
    this.value = value;
    this.date = date;
    this.user = user;
  }

  @IsNotEmpty()
  readonly type: InvestmentType;

  @IsNotEmpty()
  readonly value: string;

  @IsNotEmpty()
  readonly date: Date;

  user: UserSchema;
}
