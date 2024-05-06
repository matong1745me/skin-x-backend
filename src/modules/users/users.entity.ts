import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
