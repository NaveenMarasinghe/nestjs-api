import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/users/user.entity';
import { IUser } from 'src/users/IUser';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  getUserById(@Param() params): Promise<User[]> {
    return this.usersService.getUserById(params.id);
  }

  @Post()
  addNewUser(@Body() user: IUser) {
    return this.usersService.addNewUser(user);
  }

  @Put(':id')
  @ApiParam({ name: 'id' })
  updateUser(@Body() user: IUser, @Param() params) {
    return this.usersService.updateUser(user, params.id);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  deleteUser(@Param() params) {
    return this.usersService.deleteUser(params.id);
  }
}
