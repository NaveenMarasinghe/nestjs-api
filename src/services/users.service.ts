import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entities';
import { UserDto } from 'src/interfaces/user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  async getUserById(data): Promise<User[]> {
    const user = await this.usersRepository.findOneBy({ id: data });
    return await [user];
  }
  async addNewUser(data: UserDto): Promise<User[]> {
    const user = new User();
    user.email = data.email;
    user.name = data.name;
    user.password = data.password;

    await this.usersRepository.save(user);
    return await this.findAll();
  }
}
