import { PagingQueryDto } from '~shared/common/dto/paging-query.dto';
import { Proxy } from '../entities/proxy.entity';

export abstract class IProxyRepository {
  abstract save(proxy: Proxy): Promise<Proxy>;

  abstract update(id: string, proxy: Proxy): Promise<boolean>;

  abstract findById(id: string): Promise<Proxy | null>;

  abstract findAll(): Promise<Proxy[]>;

  abstract softDelete(id: string): Promise<void>;

  abstract findPagedAndFiltered(
    paging: PagingQueryDto,
  ): Promise<[Proxy[], number]>;
}
