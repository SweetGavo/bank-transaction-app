import { Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';
import { transporter } from 'src/email/nodemailer';
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
     // Validate user data
     if (!name || !cpf || !email || !age) {
      return { error: 'Unfilled data' };
    } else if (cpf.trim() === '') {
      return { error: 'Unfilled cpf' };
    }

    try {
      // Save the new user
      const result = await newUser.save();

      // Check if user was saved successfully
      if (!result) {
        return { error: 'Failed to create user' };
      }

      // Send email notification
      await transporter.sendMail({
        from: 'Gavin Emuveyan <longgaving@gmail.com>',
        to: 'longgaving@gmail.com',
        subject: 'Message from Nodemailer',
        text: 'Hello World',
        html: '<p>User successfully created </p>',
      });

      console.log('Email sent successfully!');
      return { result };
    } catch (error) {
      console.error('Error creating user or sending email:', error);
      return { error: 'An error occurred' };
    }
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
