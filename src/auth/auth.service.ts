import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './entity/user/users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { compare } from 'bcrypt';
import { UserEntity } from './entity/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadInterface } from './interface/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository) private userRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user: UserEntity = await this.userRepository.findOne({ username });
    if (user && (await compare(password, user.password))) {
      const payload: JwtPayloadInterface = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    }
    throw new UnauthorizedException('Проверьте ваш логин и пароль');
  }
}
