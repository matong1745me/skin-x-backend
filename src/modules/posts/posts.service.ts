import { Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { Post } from './posts.entity';
import { User } from '@/modules/users/users.entity';
import { Tag } from '@/modules/tags/tags.entity';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async createPost(
    title: string,
    content: string,
    user: User,
    tags: Tag[],
  ): Promise<Post> {
    const newPost = this.postsRepository.createPost(title, content, user, tags);

    return newPost;
  }
}
