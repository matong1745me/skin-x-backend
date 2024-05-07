import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './posts.entity';
import { Tag } from '@/modules/tags/tags.entity';
import { User } from '@/modules/users/users.entity';

@Injectable()
export class PostsRepository extends Repository<Post> {
  constructor(
    @InjectRepository(Post)
    private repository: Repository<Post>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
  async createPost(
    title: string,
    content: string,
    postBy: User,
    tags: Tag[],
  ): Promise<Post> {
    const post = this.create({ title, content, postBy, tags });

    return await this.save(post);
  }
}
