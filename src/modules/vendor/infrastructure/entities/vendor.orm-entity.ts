import { Column, Entity, OneToMany } from 'typeorm';
import { ProxyOrmEntity } from '~modules/proxy/infrastructure/entities/proxy.orm-entity';
import { BaseOrmEntity } from '~shared/common/orm-entities/base.orm-entity';

@Entity('vendors')
export class VendorOrmEntity extends BaseOrmEntity {
  @Column()
  name: string;

  @OneToMany(() => ProxyOrmEntity, (proxy) => proxy.vendor)
  proxies: ProxyOrmEntity[];
}
