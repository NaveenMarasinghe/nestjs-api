import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from 'src/entities/user.entities';
import { UserDto } from 'src/interfaces/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  getUserById(@Param() params): Promise<User[]> {
    return this.usersService.getUserById(params.id);
  }

  @Post()
  addNewUser(@Body() user: UserDto) {
    return this.usersService.addNewUser(user);
  }

  @Put()
  updateUser(@Body() user: UserDto) {
    return this.usersService.updateUser(user);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.usersService.deleteUser(params.id);
  }
}
