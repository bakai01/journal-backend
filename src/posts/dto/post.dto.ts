export class PostDto {
  readonly id: number;
  readonly title: string;
  readonly body: string;
  readonly tags?: string;
  readonly views: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
};
