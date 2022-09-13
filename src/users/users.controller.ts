import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/users/user.entity';
import { IUser, Role } from 'src/users/IUser';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBody({ type: User })
  @Post()
  @Roles(Role.Admin)
  addNewUser(@Body() user: IUser) {
    return this.usersService.addNewUser(user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBody({ type: User })
  @Put(':id')
  @Roles(Role.Admin)
  @ApiParam({ name: 'id' })
  updateUser(@Body() user: IUser, @Param() params) {
    return this.usersService.updateUser(user, params.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @Roles(Role.Admin)
  @ApiParam({ name: 'id' })
  deleteUser(@Param() params) {
    return this.usersService.deleteUser(params.id);
  }
}
