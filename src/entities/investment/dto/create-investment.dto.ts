import { UserSchema } from 'src/entities/user/schema/user.schema';
import { InvestmentType } from '../schema/investment.schema';
import { IsNotEmpty } from 'class-validator';

export class CreateInvestmentDto {
  @IsNotEmpty()
  readonly type: InvestmentType;

  @IsNotEmpty()
  readonly value: string;

  @IsNotEmpty()
  readonly date: Date;

  user: UserSchema;
}
