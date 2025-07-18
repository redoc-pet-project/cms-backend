import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ProxyStatus, ProxyType } from '~modules/proxy/domain/enums/proxy.enum';
import { ProxyCategoriesOrmEntity } from '~modules/proxy/infrastructure/entities/proxy-categories.orm-entity';
import { Vendor } from '~modules/vendor/domain/entities/vendor.entity';
import { VendorOrmEntity } from '~modules/vendor/infrastructure/entities/vendor.orm-entity';

@Entity('proxies')
export class ProxyOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ip: string;

  @Column()
  port: number;

  @Column({ type: 'enum', enum: ProxyType })
  type: ProxyType;

  @Column()
  country: string;

  @Column({ type: 'enum', enum: ProxyStatus })
  status: ProxyStatus;

  @Column({ nullable: true, type: 'text' })
  description: string | null;

  @Column({ name: 'vendor_id' })
  vendorId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;

  @OneToMany(
    () => ProxyCategoriesOrmEntity,
    (proxyCategories) => proxyCategories.proxy,
  )
  proxyCategories: ProxyCategoriesOrmEntity[];

  @ManyToOne(() => VendorOrmEntity, (vendor) => vendor.proxies)
  vendor: VendorOrmEntity;
}
