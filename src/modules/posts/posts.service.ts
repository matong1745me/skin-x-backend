import { Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { Post } from './posts.entity';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async createPost(
    title: string,
    content: string,
    user: string,
    tags: string[],
  ): Promise<Post> {
    const newPost = this.postsRepository.createPost(title, content, user, tags);

    return newPost;
  }
}
