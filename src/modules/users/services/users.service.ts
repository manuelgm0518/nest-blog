import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities/user';
import { UserCreateDto } from '../models/user-create.dto';
import { Model } from 'mongoose';

export interface IUsersService {
  create(dto: UserCreateDto): Promise<User>;
  getById(id: string): Promise<User>;
  getByEmail(email: string): Promise<User>;
  getAll(): Promise<User[]>; // TODO: Implement filters
  updateById(id: string, dto: UserCreateDto): Promise<User>;
  deleteById(id: string): Promise<User>;
}

export class UsersService implements IUsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(dto: UserCreateDto): Promise<User> {
    const newUser = new this.userModel(dto);
    return newUser.save();
  }

  getById(id: string): Promise<User> {
    const user = this.userModel.findById(id);
    return user;
  }

  getByEmail(email: string): Promise<User> {
    const user = this.userModel.findOne({ email });
    return user;
  }

  getAll(): Promise<User[]> {
    const users = this.userModel.find();
    return users;
  }

  updateById(id: string, dto: UserCreateDto): Promise<User> {
    const user = this.userModel.findByIdAndUpdate(id, dto);
    return user;
  }

  async deleteById(id: string): Promise<User> {
    const user = await this.getById(id);
    if (!user) throw new Error(`The user with the id ${id} does not exist.`);
    await this.userModel.findByIdAndDelete(id);
    return user;
  }
}
