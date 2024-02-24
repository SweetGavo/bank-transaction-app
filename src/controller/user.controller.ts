// user.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto } from '../utils/user.dto';
import { User, UserDocument } from '../model/user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

/**
 * Controller for handling user-related HTTP requests.
 */
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService , @InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   * Retrieves all users.
   * @returns A promise that resolves to an array of users.
   */
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  /**
   * Retrieves a single user by ID.
   * @param id - The ID of the user to retrieve.
   * @returns A promise that resolves to the retrieved user.
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  /**
   * Creates a new user.
   * @param createUserDto - The data for creating the new user.
   * @returns A promise that resolves to the created user.
   */
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = this.userModel.create(createUserDto);
    return (await user).save();
  }

  /**
   * Updates an existing user by ID.
   * @param id - The ID of the user to update.
   * @param updateUserDto - The data for updating the user.
   * @returns A promise that resolves to the updated user.
   */
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  /**
   * Removes a user by ID.
   * @param id - The ID of the user to remove.
   * @returns A promise that resolves to the removed user.
   */
  @Delete(':id')
  remove(@Param('id') id: string): Promise<User> {
    return this.userService.remove(id);
  }
}
