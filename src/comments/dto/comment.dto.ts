export class CommentDto {
  readonly text: string;
  readonly post: { id: number };
  readonly user: { id: number };
  readonly id: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
};
