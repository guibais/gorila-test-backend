import { CreateInvestmentDto } from './dto/create-investment.dto';
import { DeleteUserInvestmentDto } from './dto/delete-investment.dto';
import { EditUserInvestmentDto } from './dto/edit-investment.dto';
import { InvestmentSchema } from './schema/investment.schema';

export interface IInvestmentService {
  getByUser(userId: number): Promise<InvestmentSchema[]>;
  create(createInvestmentDto: CreateInvestmentDto): Promise<InvestmentSchema>;
  update(editInvestmentDto: EditUserInvestmentDto);
  delete(deleteInvestmentDto: DeleteUserInvestmentDto);
}
