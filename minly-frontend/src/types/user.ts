import { Like } from './like';
import { Media } from './media';

export type User = {
  id: number;

  name: string;

  email: string;

  password: string;

  createdAt: Date;

  updatedAt: Date;

  media: Media[];

  likes: Like[];
};
