import { PostDto } from './post.dto';

export class CountPostsDto {
  readonly posts: PostDto[];
  readonly count: number;
};