import { PostEntity } from '../entities/post.entity';

export class CountPostsDto {
  readonly posts: PostEntity[];
  readonly count: number;
};