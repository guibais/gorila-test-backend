import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import constants from './common/constants';
import { JwtStrategy } from './common/jwt.strategy';
import { InvestmentModule } from './entities/investment/investment.module';
import { UserModule } from './entities/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...constants.dbConstants,
      entities: [join(__dirname, '**', '*.schema.{ts,js}')],
    }),
    UserModule,
    InvestmentModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
