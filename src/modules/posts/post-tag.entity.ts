import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './posts.entity';
import { Tag } from '@/modules/tags/tags.entity';

@Entity()
export class PostTag {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Post, (post) => post.tags)
  post: Post;

  @ManyToOne(() => Tag, (tag) => tag.posts)
  tag: Tag;
}
