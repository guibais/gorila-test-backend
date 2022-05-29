import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AppResponseDto } from 'src/shared/dto/app-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthUser } from 'src/common/user.decorator';
import { JwtAuthGuard } from 'src/common/jwt-auth.guard';

import { UserToken } from './entity/userToken';
import { Auth } from 'src/common/auth.decorator';
import { IUserService } from './user.interface';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Controller('users')
export class UserController {
  constructor(
    @Inject('IUser') private readonly userService: IUserService,
    private jwtService: JwtService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<AppResponseDto> {
    const password = await bcrypt.hash(createUserDto.password, 10);
    const id = await this.userService.create({ ...createUserDto, password });
    const obj = await this.retrievePayload(id);
    return new AppResponseDto(200, obj);
  }

  @Get()
  @Auth()
  async get(@AuthUser() authUser: UserToken): Promise<AppResponseDto> {
    const user = await this.userService.getByEmail(authUser.data.email);
    return new AppResponseDto(201, { user });
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const user = await this.userService.getByEmail(loginUserDto.email);
      const isPasswordMatching = await bcrypt.compare(
        loginUserDto.password,
        user.password,
      );
      if (!isPasswordMatching) {
        throw new HttpException(
          'Credenciais inválidas',
          HttpStatus.BAD_REQUEST,
        );
      }
      const obj = await this.retrievePayload(user.id);
      return new AppResponseDto(200, obj);
    } catch (error) {
      console.log(error);
      throw new HttpException('Credenciais inválidas', HttpStatus.BAD_REQUEST);
    }
  }

  async retrievePayload(id) {
    const retrieved = await this.userService.getById(id);
    const payload = {
      name: retrieved.name,
      email: retrieved.email,
      _id: retrieved.id,
    };
    return {
      user: payload,
      access_token: this.jwtService.sign({
        data: payload,
      }),
    };
  }
}
