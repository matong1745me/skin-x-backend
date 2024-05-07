import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { Post } from '@/modules/posts/posts.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  displayName: string;

  @Column({ unique: true })
  username: string;

  @Column({ select: false })
  passwordHash: string;

  @OneToMany(() => Post, (post) => post.postBy)
  posts: Post[];

  getPassword(): string {
    return this.passwordHash;
  }

  @BeforeInsert()
  async password() {
    const passwordHash = await bcrypt.hash(this.password, 10);
    this.passwordHash = passwordHash;
  }
}
