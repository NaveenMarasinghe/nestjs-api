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
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':username')
  @ApiParam({ name: 'username' })
  getUserById(@Param() params): Promise<User> {
    return this.usersService.findOne(params.username);
  }

  @ApiBody({ type: User })
  @Post()
  addNewUser(@Body() user: IUser) {
    return this.usersService.addNewUser(user);
  }

  @ApiBody({ type: User })
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
