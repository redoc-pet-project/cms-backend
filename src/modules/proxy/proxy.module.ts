import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateProxyUseCase } from './application/use-cases/create-proxy.use-case';
import { IProxyRepository } from './domain/repositories/proxy.repository';
import { ProxyOrmEntity } from './infrastructure/entities/proxy.orm-entity';
import { ProxyRepositoryImpl } from './infrastructure/repositories/proxy.repository.impl';
import { ProxyController } from './interface/controllers/proxy.controller';
import { ProxyCategoriesOrmEntity } from '~modules/proxy/infrastructure/entities/proxy-categories.orm-entity';
import { CategoryOrmEntity } from '~modules/category/infrastructure/entities/category.orm-entity';
import { UpdateProxyUseCase } from '~modules/proxy/application/use-cases/update-proxy.use-case';
import { DeleteProxyUseCase } from '~modules/proxy/application/use-cases/delete-proxy.use-case';
import { ListProxiesUseCase } from '~modules/proxy/application/use-cases/list-proxies.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProxyOrmEntity,
      ProxyCategoriesOrmEntity,
      CategoryOrmEntity,
    ]),
  ],
  controllers: [ProxyController],
  providers: [
    { provide: IProxyRepository, useClass: ProxyRepositoryImpl },
    CreateProxyUseCase,
    UpdateProxyUseCase,
    DeleteProxyUseCase,
    ListProxiesUseCase,
  ],
})
export class ProxyModule {}
