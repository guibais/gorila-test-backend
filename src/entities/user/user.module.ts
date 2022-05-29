import { Global, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import constants from 'src/common/constants';

const UserServiceProvider: Provider = {
  provide: 'IUser',
  useClass: UserService,
};

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([UserSchema]),
    JwtModule.register({
      secret: constants.jwtConstants.secret,
      signOptions: { expiresIn: '2592000s' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserServiceProvider],
  exports: [UserService],
})
export class UserModule {}
