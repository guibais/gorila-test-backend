import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppResponseDto } from 'src/shared/dto/app-response.dto';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UserSchema } from '../user/schema/user.schema';
import { Auth } from 'src/common/auth.decorator';
import { AuthUser } from 'src/common/user.decorator';
import { UserToken } from '../user/entity/userToken';
import { EditUserInvestmentDto } from './dto/edit-investment.dto';
import { DeleteUserInvestmentDto } from './dto/delete-investment.dto';
import { IInvestmentService } from './investment.interface';
import { InvestmentType } from './schema/investment.schema';

@Controller('investments')
export class InvestmentController {
  constructor(
    @Inject('IInvestmentService')
    private readonly investmentService: IInvestmentService,
  ) {}

  @Post()
  async create(
    @Body() createInvestmentDto: CreateInvestmentDto,
  ): Promise<AppResponseDto> {
    const user = new UserSchema();
    user.id = 1;
    const investment = await this.investmentService.create({
      ...createInvestmentDto,
      user,
    });
    return new AppResponseDto(201, { investment });
  }

  @Get()
  @Auth()
  async getUserInvestments(
    @AuthUser() authUser: UserToken,
  ): Promise<AppResponseDto> {
    const investments = await this.investmentService.getByUser(
      authUser.data._id,
    );
    const fixedInvestments = investments.filter(
      (x) => x.type == InvestmentType['RENDA_FIXA'],
    );
    const variableInvestments = investments.filter(
      (x) => x.type == InvestmentType['RENDA_VARIAVEL'],
    );
    return new AppResponseDto(201, {
      fixedInvestments,
      variableInvestments,
      totalVariable: variableInvestments.reduce(
        (acc, cur) => acc + parseInt(cur.value),
        0,
      ),
      totalFixed: fixedInvestments.reduce(
        (acc, cur) => acc + parseInt(cur.value),
        0,
      ),
    });
  }

  @Put()
  @Auth()
  async editUserInvestment(
    @AuthUser() authUser: UserToken,
    @Body() editUserInvestment: EditUserInvestmentDto,
  ): Promise<AppResponseDto> {
    const user = new UserSchema();
    user.id = authUser.data._id;
    const investments = await this.investmentService.update({
      ...editUserInvestment,
      user,
    });
    return new AppResponseDto(201, { investments });
  }

  @Delete(':id')
  @Auth()
  async deleteUserInvestment(
    @AuthUser() authUser: UserToken,
    @Param() params,
  ): Promise<AppResponseDto> {
    const user = new UserSchema();
    user.id = authUser.data._id;
    const investments = await this.investmentService.delete({
      id: params.id,
      user,
    });
    return new AppResponseDto(201, { investments });
  }
}
