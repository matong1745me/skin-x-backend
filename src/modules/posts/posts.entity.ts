import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { User } from '@/modules/users/users.entity';
import { Tag } from '@/modules/tags/tags.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  postAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  postBy: User;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
}
