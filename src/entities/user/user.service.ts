import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserSchema } from './schema/user.schema';
import { IUserService } from './user.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(UserSchema)
    private usersRepository: Repository<UserSchema>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<number> {
    const createdUser = await this.usersRepository.insert({
      email: createUserDto.email,
      name: createUserDto.name,
      password: createUserDto.password,
    });
    return createdUser.raw.insertId;
  }

  async getByEmail(email: string) {
    return await this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
  }

  async getById(id: string) {
    return await this.usersRepository.findOne({ where: { id } });
  }
}
