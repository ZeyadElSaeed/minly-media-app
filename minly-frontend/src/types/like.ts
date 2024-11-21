import { Media } from './media';
import { User } from './user';

export type Like = {
  id: number;

  user: User;

  media: Media;

  createdAt: Date;
};
