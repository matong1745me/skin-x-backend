import { Injectable } from '@nestjs/common';

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
    const newUser = await this.usersRepository.createUser(
      username,
      password,
      displayName,
    );

    return newUser;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.usersRepository.findByUsername(username);

    return user;
  }
}
