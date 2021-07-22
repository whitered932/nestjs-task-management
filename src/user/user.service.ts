import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersRepository) private userRepository: UsersRepository,
  ) {}

  async findUser(username: string) {
    return this.userRepository.findOne({ username });
  }

  async createUser(createUserDto: CreateUserDto) {
    return this.userRepository.createUser(createUserDto);
  }
}
