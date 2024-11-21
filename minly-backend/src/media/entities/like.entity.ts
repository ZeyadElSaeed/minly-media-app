import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import { Media } from './media.entity';

@Entity('likes')
@Unique(['user', 'media'])
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.likes, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Media, (media) => media.likes, { onDelete: 'CASCADE' })
  media: Media;

  @CreateDateColumn()
  createdAt: Date;
}
