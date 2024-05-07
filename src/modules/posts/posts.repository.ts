import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './posts.entity';

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
    postedBy: string,
    tags: string[],
  ): Promise<Post> {
    const post = this.create({ title, content, postedBy, tags });

    return await this.save(post);
  }
  async getOneById(id: number): Promise<Post> {
    const post = await this.findOne({ where: { id } });

    return post;
  }
}
