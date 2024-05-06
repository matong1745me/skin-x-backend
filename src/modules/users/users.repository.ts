import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
  async createUser(
    username: string,
    passwordHash: string,
    displayName: string,
  ): Promise<User> {
    const user = this.create({ username, passwordHash, displayName });
    return await this.save(user);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.findOne({
      where: { username },
      select: ['passwordHash'],
    });
  }
}
