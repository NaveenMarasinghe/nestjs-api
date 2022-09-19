import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PwlessTokens } from 'src/helpers/pwlessTokens.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(PwlessTokens)
    private pwlessTokensRepository: Repository<PwlessTokens>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async pwlessLogin(token: any) {
    const pwlessToken = await this.pwlessTokensRepository.findOneBy({
      token: token,
    });
    const user = await this.usersService.findOne(pwlessToken.user);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.FORBIDDEN);
    }
    const payload = {
      email: user.email,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async createPwlessToken(email: string) {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.FORBIDDEN);
    }

    const payload = {
      email: user.email,
      sub: user.id,
    };
    const accessToken = this.jwtService.sign(payload);

    const pwlessToken = new PwlessTokens();
    pwlessToken.user = email;
    pwlessToken.token = accessToken;

    const activeToken = this.findOne(email);

    if (activeToken) {
      await this.pwlessTokensRepository
        .createQueryBuilder()
        .update({ token: accessToken })
        .where({ user: email })
        .returning('*')
        .execute();

      return activeToken;
    } else {
      const token = await this.pwlessTokensRepository.save(pwlessToken);
      return token;
    }
  }

  async findOne(email: string): Promise<PwlessTokens> {
    const pwlessToken = await this.pwlessTokensRepository.findOneBy({
      user: email,
    });
    return pwlessToken;
  }

  async findOneByToken(token: string): Promise<PwlessTokens> {
    const pwlessToken = await this.pwlessTokensRepository.findOneBy({
      token: token,
    });
    return pwlessToken;
  }
}
