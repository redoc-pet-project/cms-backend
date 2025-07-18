export class PagedResultDto<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };

  constructor(data: T[], total: number, page: number, limit: number) {
    this.data = data;
    this.meta = {
      total,
      page,
      limit,
    };
  }
}
