import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../../user/user.entity';

export const GetUser = createParamDecorator(
  (_, context: ExecutionContext): UserEntity => {
    const req = context.switchToHttp().getRequest();
    return req.user;
  },
);
