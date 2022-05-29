import { CreateUserDto } from './dto/create-user.dto';
import { UserSchema } from './schema/user.schema';

export interface IUserService {
  create(createUserDto: CreateUserDto): Promise<number>;

  getByEmail(email: string): Promise<UserSchema>;

  getById(id: string): Promise<UserSchema>;
}
