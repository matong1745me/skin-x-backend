import { Post } from '../posts.entity';

export class ResponseGetAllPostDto {
  page: number;
  total: number;
  order: string;
  posts: Post[];
}
