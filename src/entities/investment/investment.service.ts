import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { DeleteUserInvestmentDto } from './dto/delete-investment.dto';
import { EditUserInvestmentDto } from './dto/edit-investment.dto';
import { IInvestmentService } from './investment.interface';
import { InvestmentSchema } from './schema/investment.schema';

@Injectable()
export class InvestmentService implements IInvestmentService {
  constructor(
    @InjectRepository(InvestmentSchema)
    private investmentRepository: Repository<InvestmentSchema>,
  ) {}

  async create(
    createInvestmentDto: CreateInvestmentDto,
  ): Promise<InvestmentSchema> {
    const createdInvestment = await this.investmentRepository.insert({
      date: createInvestmentDto.date,
      value: createInvestmentDto.value,
      type: createInvestmentDto.type,
      user: createInvestmentDto.user,
    });
    return createdInvestment.raw[0];
  }

  async getByUser(userId: number) {
    return await this.investmentRepository.find({
      where: { user: userId },
      order: { date: 'DESC' },
    });
  }

  async update(editInvestmentDto: EditUserInvestmentDto) {
    return await this.investmentRepository.update(
      { id: editInvestmentDto.id, user: editInvestmentDto.user },
      {
        type: editInvestmentDto.type,
        value: editInvestmentDto.value,
        date: editInvestmentDto.date,
      },
    );
  }

  async delete(deleteInvestmentDto: DeleteUserInvestmentDto) {
    return await this.investmentRepository.delete({
      id: deleteInvestmentDto.id,
      user: deleteInvestmentDto.user,
    });
  }
}
