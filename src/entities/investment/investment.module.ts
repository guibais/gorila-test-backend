import { Global, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestmentController } from './investment.controller';
import { InvestmentSchema } from './schema/investment.schema';
import { InvestmentService } from './investment.service';

const InvestmentServiceProvider: Provider = {
  provide: 'IInvestmentService',
  useClass: InvestmentService,
};

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([InvestmentSchema])],
  controllers: [InvestmentController],
  providers: [InvestmentService, InvestmentServiceProvider],
  exports: [InvestmentService],
})
export class InvestmentModule {}
