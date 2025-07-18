import { Injectable } from '@nestjs/common';
import { Proxy } from '~modules/proxy/domain/entities/proxy.entity';
import { ProxyStatus } from '~modules/proxy/domain/enums/proxy.enum';
import { IProxyRepository } from '~modules/proxy/domain/repositories/proxy.repository';
import { ProxyResponseDto } from '~modules/proxy/interface/dto/proxy-response.dto';
import { CreateProxyDto } from '../dto/create-proxy.dto';

@Injectable()
export class CreateProxyUseCase {
  constructor(private readonly proxyRepo: IProxyRepository) {}

  async execute(dto: CreateProxyDto): Promise<ProxyResponseDto> {
    const proxy = Proxy.create({
      ip: dto.ip,
      port: dto.port,
      type: dto.type,
      country: dto.country,
      status: ProxyStatus.ACTIVE,
      description: dto.description ?? null,
      vendorId: dto.vendorId,
      categoryIds: dto.categoryIds,
    });

    const saved = await this.proxyRepo.save(proxy);

    return ProxyResponseDto.fromDomain(saved);
  }
}
