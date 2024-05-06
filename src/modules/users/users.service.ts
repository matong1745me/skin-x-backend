import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersRepository } from './users.repository';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async registerUser(
    username: string,
    password: string,
    displayName: string,
  ): Promise<User> {
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await this.usersRepository.createUser(
      username,
      passwordHash,
      displayName,
    );

    return newUser;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.usersRepository.findByUsername(username);

    return user;
  }
}
