import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
// import { CreatePostDto } from './dto/create-post.dto';

import { JwtAuthGuard } from '@/guards/auth.guard';
import { Post as PostEntity } from './posts.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { ResponseCreatePostDto } from './dto/response-create-post.dto';
import { ErrorResponseDto } from '@/dto/error-response.dto';
import { PostsService } from './posts.service';
import { UserPayloadDto } from '@/dto/user-payload.dto';
import { ResponseGetAllPostDto } from './dto/response-get-all-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getPost(
    @Query('search') search: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sortBy') sortBy: 'title' | 'postedAt' = 'title',
    @Query('order') order: 'ASC' | 'DESC' = 'ASC',
  ): Promise<ResponseGetAllPostDto> {
    const { posts, total } =
      await this.postsService.findAllWithFilterAndPagination(
        search,
        page,
        limit,
        sortBy,
        order,
      );

    return {
      page: Number(page),
      total,
      order,
      posts,
    };
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
        postedBy: newPost.postedBy,
        postedAt: newPost.postedAt,
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
