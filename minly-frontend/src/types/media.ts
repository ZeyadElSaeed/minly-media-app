import { Like } from './like';
import { MediaType } from './mediaType';
import { User } from './user';

export type Media = {
  id: number;
  type: MediaType;
  title: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  likes: Like[];
};
