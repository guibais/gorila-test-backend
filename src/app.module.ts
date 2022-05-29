import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
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
      type: 'mysql',
      host: '108.179.252.165',
      port: 3306,
      username: 'tagcom08_gorila',
      password: 'gorila1234',
      database: 'tagcom08_gorila',
      entities: [join(__dirname, '**', '*.schema.{ts,js}')],
      synchronize: true,
    }),
    UserModule,
    InvestmentModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
