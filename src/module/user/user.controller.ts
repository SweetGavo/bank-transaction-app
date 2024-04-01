import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';

@Controller('user')
export class UserController {
  constructor(
    private readonly userservice: UserService,
    @InjectModel('User') private userModel: mongoose.Model<User>,
  ) {}

  @Get('/users')
  async getUsers(@Res() response) {
    try {
      const users = await this.userservice.getAll();
      return response.status(200).json(users);
    } catch (error) {
      return response.status(404).json({ error: error.message });
    }
  }

  @Post('/signup')
  async signin(@Body() dto: any) {
    const { name, email, cpf, age } = dto;

    const findUserByCpf = await this.userModel.findOne({ cpf });

    if (findUserByCpf) {
      return { error: 'CPF already in use' };
    }

    const newUser = await this.userservice.createUser(name, email, cpf, age);
    return newUser;
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Res() response,
    @Body() user: User,
  ) {
    try {
      const updatedUser = await this.userservice.update(id, user);
      return response.status(200).json(updatedUser);
    } catch (error) {
      if (error instanceof NotFoundException) {
        response.status(404).json({ error: error.message });
      } else {
        response.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Res() response): Promise<void> {
    try {
      await this.userservice.delete(id);
      response.status(200).send(`User ${id} SUCCESFULLY DELETED`);
    } catch (error) {
      if (error instanceof NotFoundException) {
        response.status(404).json({ error: error.message });
      } else {
        response.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }
}
