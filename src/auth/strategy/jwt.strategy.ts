import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersRepository } from '../entity/user/users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayloadInterface } from '../interface/jwt-payload.interface';
import { UserEntity } from '../entity/user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
  ) {
    super({
      secretOrKey: '1234',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayloadInterface): Promise<UserEntity> {
    const { username } = payload;
    const user: UserEntity = await this.usersRepository.findOne({ username });
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
