export type SortDirection = 'ASC' | 'DESC';
export type ProxySortKey = 'ip' | 'type' | 'country' | 'status' | 'createdAt';

export class PagingQueryDto {
  page: number;
  limit: number;
  sortKey?: ProxySortKey;
  orderBy?: SortDirection;
  search?: string;

  constructor(
    page = 1,
    limit = 10,
    sortKey?: ProxySortKey,
    orderBy?: SortDirection,
    search?: string,
  ) {
    this.page = Math.max(1, page);
    this.limit = Math.min(Math.max(1, limit), 100);
    this.sortKey = sortKey;
    this.orderBy = orderBy ?? 'DESC';
    this.search = search?.trim();
  }

  get offset(): number {
    return (this.page - 1) * this.limit;
  }
}
