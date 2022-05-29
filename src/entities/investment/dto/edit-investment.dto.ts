import { UserSchema } from 'src/entities/user/schema/user.schema';
import { InvestmentType } from '../schema/investment.schema';
import { IsNotEmpty } from 'class-validator';

export class EditUserInvestmentDto {
  constructor({ id, type, value, date }) {
    this.id = id;
    this.type = type;
    this.value = value;
    this.date = date;
  }

  @IsNotEmpty()
  readonly id: number;

  @IsNotEmpty()
  readonly type: InvestmentType;

  @IsNotEmpty()
  readonly value: string;

  @IsNotEmpty()
  readonly date: Date;

  user: UserSchema;
}
