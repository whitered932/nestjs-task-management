import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadInterface } from './interface/jwt-payload.interface';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<void> {
    await this.userService.createUser(createUserDto);
  }

  async signIn(createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
    const { username, password } = createUserDto;
    const user: UserEntity = await this.userService.findUser(username);
    if (user && (await compare(password, user.password))) {
      const payload: JwtPayloadInterface = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    }
    throw new UnauthorizedException('Проверьте ваш логин и пароль');
  }
}
