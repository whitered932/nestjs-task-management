import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadInterface } from '../interface/jwt-payload.interface';
import { UserEntity } from '../../user/user.entity';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      secretOrKey: '1234',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayloadInterface): Promise<UserEntity> {
    const { username } = payload;
    const user: UserEntity = await this.userService.findUser(username);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
