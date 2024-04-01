import { Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
  private User: User[] = [];
  constructor(@InjectModel('User') private userModel: mongoose.Model<User>) {}

  async getAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async createUser(name: string, email: string, cpf: string, age: number) {
    const newUser = new this.userModel({ name, email, cpf, age });
    if (!name || !cpf || !email || !age) {
      return { error: 'Unfilled data' };
    } else if (cpf.trim() === '') {
      return { error: 'Unfilled cpf' };
    }
    const result = await newUser.save();
    return result;
  }

  async getById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    return user;
  }
  
  async update(id: string, { name, cpf, email, age }: User): Promise<User> {
    const user = await this.userModel.findById(id);

    user.name = name;
    user.age = age;
    user.cpf = cpf;
    user.email = email;
  
    await user.save();
  
    return { ...user.toObject() };
  }
  
  async delete(id: string ): Promise<void> {
    const userIndex =  await this.userModel.findByIdAndDelete(id);
   return userIndex.toObject();
  }
}
