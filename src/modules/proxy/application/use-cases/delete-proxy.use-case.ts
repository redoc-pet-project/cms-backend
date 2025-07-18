import { Injectable } from '@nestjs/common';
import { IProxyRepository } from '~modules/proxy/domain/repositories/proxy.repository';
import { NotFound } from '~shared/common/exceptions/not-found.exception';

@Injectable()
export class DeleteProxyUseCase {
  constructor(private readonly proxyRepo: IProxyRepository) {}

  async execute(id: string): Promise<void> {
    const proxy = await this.proxyRepo.findById(id);
    if (!proxy) throw new NotFound('Proxy not found');

    await this.proxyRepo.softDelete(id);
  }
}
