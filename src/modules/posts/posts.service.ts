import { Injectable, NotFoundException } from '@nestjs/common';
import { Like, FindManyOptions, ArrayContains } from 'typeorm';
import { PostsRepository } from './posts.repository';
import { Post } from './posts.entity';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async findAllWithFilterAndPagination(
    search: string,
    tags: string,
    page: number = 1,
    limit: number = 10,
    sortBy: 'title' | 'postedAt' = 'title',
    order: 'ASC' | 'DESC' = 'ASC',
  ): Promise<{ posts: Post[]; total: number }> {
    const options: FindManyOptions<Post> = {
      take: limit,
      skip: (page - 1) * limit,
      order: {
        [sortBy]: order,
      },
    };

    if (search || tags) {
      options.where = [
        { title: Like(`%${search}%`) },
        { tags: ArrayContains(tags.split(',')) },
        { postedBy: Like(`%${search}%`) },
      ];
    }
    const [result, total] = await this.postsRepository.findAndCount(options);

    return { posts: result, total };
  }

  async createPost(
    title: string,
    content: string,
    user: string,
    tags: string[],
  ): Promise<Post> {
    const newPost = this.postsRepository.createPost(title, content, user, tags);

    return newPost;
  }

  async getOneById(id: number): Promise<Post> {
    const post = await this.postsRepository.getOneById(id);

    if (!post) {
      throw new NotFoundException('Post is not found !');
    }

    return post;
  }
}
