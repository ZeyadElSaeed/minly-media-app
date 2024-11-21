import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MediaType } from './mediaType';
import { Like } from './like.entity';

@Entity('media')
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: MediaType })
  type: MediaType;

  @Column({ nullable: true, default: 'No Title' })
  title: string;

  @Column({ nullable: false })
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.media, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Like, (like) => like.media)
  likes: Like[];
}
