import { Controller, Get, Request, UseGuards } from '@nestjs/common';
// import { CreatePostDto } from './dto/create-post.dto';

import { JwtAuthGuard } from '@/guards/auth.guard';
import { Post as PostEntity } from './posts.entity';

@Controller('posts')
export class PostsController {
  @Get()
  @UseGuards(JwtAuthGuard)
  async getPost(@Request() req): Promise<PostEntity> {
    const payload = req.user;

    return payload;
  }
}
