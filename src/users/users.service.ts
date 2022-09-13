import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }
  async findOne(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email: email });
    return user;
  }
  async addNewUser(data: User): Promise<User[]> {
    const user = new User();
    user.email = data.email;
    user.name = data.name;
    user.password = data.password;
    user.roles = data.roles;

    await this.usersRepository.save(user);
    return await this.findAll();
  }
  async updateUser(data: User, id: number): Promise<User[]> {
    const result = await this.usersRepository
      .createQueryBuilder()
      .update({
        email: data.email,
        password: data.password,
        name: data.name,
        roles: data.roles,
      })
      .where({
        id: id,
      })
      .returning('*')
      .execute();

    return await result.raw[0];
  }

  async deleteUser(data: number) {
    const result = await this.usersRepository.delete({ id: data });
    return result;
  }
}
