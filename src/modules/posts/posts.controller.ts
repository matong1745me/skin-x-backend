import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
// import { CreatePostDto } from './dto/create-post.dto';

import { JwtAuthGuard } from '@/guards/auth.guard';
import { Post as PostEntity } from './posts.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { ResponseCreatePostDto } from './dto/response-create-post';
import { ErrorResponseDto } from '@/dto/error-response.dto';
import { PostsService } from './posts.service';
import { UserPayloadDto } from '@/dto/user-payload.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getPost(@Request() req): Promise<PostEntity> {
    const payload = req.user;

    return payload;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPost(
    @Request() req: { body: CreatePostDto; user: UserPayloadDto },
  ): Promise<ResponseCreatePostDto> {
    try {
      const { user, body } = req;
      const newPost = await this.postsService.createPost(
        body.title,
        body.content,
        user.displayName,
        body.tags,
      );
      const responsePost = {
        id: newPost.id,
        title: newPost.title,
        content: newPost.content,
        tags: newPost.tags,
        postBy: newPost.postBy,
        postAt: newPost.postAt,
      };

      return responsePost;
    } catch (error) {
      const errorResponse = new ErrorResponseDto(
        HttpStatus.BAD_REQUEST,
        error.message,
        'BadRequestError',
      );
      throw new HttpException(errorResponse, HttpStatus.BAD_REQUEST);
    }
  }
}
