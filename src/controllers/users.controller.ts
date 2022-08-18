import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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
  getProductById(@Param() params): Promise<User[]> {
    return this.usersService.getUserById(params.id);
  }

  @Post()
  addNewProduct(@Body() user: UserDto) {
    return this.usersService.addNewUser(user);
  }
}
