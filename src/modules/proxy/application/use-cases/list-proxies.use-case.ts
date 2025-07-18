import { Injectable } from '@nestjs/common';
import { NestedCategoryDto } from '~modules/category/interface/dto/nested-category.dto';
import { IProxyRepository } from '~modules/proxy/domain/repositories/proxy.repository';
import { ProxyResponseDto } from '~modules/proxy/interface/dto/proxy-response.dto';
import { PagedResultDto } from '~shared/common/dto/paged-result.dto';
import { PagingQueryDto } from '~shared/common/dto/paging-query.dto';

@Injectable()
export class ListProxiesUseCase {
  constructor(private readonly proxyRepo: IProxyRepository) {}

  async execute(
    paging: PagingQueryDto,
  ): Promise<PagedResultDto<ProxyResponseDto>> {
    const [entities, total] = (await this.proxyRepo.findPagedAndFiltered(
      paging,
    )) as [ProxyResponseDto[], number];
    return new PagedResultDto(entities, total, paging.page, paging.limit);
  }
}
