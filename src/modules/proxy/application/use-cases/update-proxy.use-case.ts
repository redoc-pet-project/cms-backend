import { Injectable, Logger } from '@nestjs/common';
import { NotFound } from '~shared/common/exceptions/not-found.exception';
import { IProxyRepository } from '../../domain/repositories/proxy.repository';
import { UpdateProxyDto } from '../dto/update-proxy.dto';
import { Proxy } from '~modules/proxy/domain/entities/proxy.entity';

@Injectable()
export class UpdateProxyUseCase {
  constructor(
    private readonly proxyRepo: IProxyRepository,
    private readonly logger: Logger,
  ) {}

  async execute(id: string, dto: UpdateProxyDto): Promise<boolean> {
    const existing = await this.proxyRepo.findById(id);
    if (!existing) throw new NotFound('Proxy not found');

    const updated = Proxy.update(existing, dto);
    return this.proxyRepo.update(id, updated);
  }
}
