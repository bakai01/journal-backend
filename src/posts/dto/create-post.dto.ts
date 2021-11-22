export class CreatePostDto {
  readonly title: string;
  readonly body: string;
  readonly tags?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
};
