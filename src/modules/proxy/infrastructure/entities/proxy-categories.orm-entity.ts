import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CategoryOrmEntity } from '~modules/category/infrastructure/entities/category.orm-entity';
import { ProxyOrmEntity } from '~modules/proxy/infrastructure/entities/proxy.orm-entity';

@Entity('proxies_categories')
export class ProxyCategoriesOrmEntity {
  @PrimaryColumn({ name: 'proxy_id' })
  proxyId: string;

  @PrimaryColumn({ name: 'category_id' })
  categoryId: string;

  // Optional for cascade/joins — not required if you only store IDs
  @ManyToOne(() => ProxyOrmEntity, (proxy) => proxy.proxyCategories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'proxy_id' })
  proxy: ProxyOrmEntity;

  @ManyToOne(() => CategoryOrmEntity, (category) => category.proxyCategories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: CategoryOrmEntity;
}
