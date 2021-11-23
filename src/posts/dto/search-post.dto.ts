
export class SearchPostDto {
  readonly title?: string;
  readonly body?: string;
  readonly views?: 'DESC' | 'ASC';
  readonly tag?: string;
  readonly limit?: number;
  readonly take?: number;
};
