import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { genSalt, hash } from 'bcrypt';

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { username, password } = createUserDto;

    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);

    const user = this.create({ username, password: hashedPassword });
    try {
      return await this.save(user);
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException(
          'Пользователь с таким именем уже существует',
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
