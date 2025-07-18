import {
  Column,
  Entity,
  OneToMany,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { ProxyCategoriesOrmEntity } from '~modules/proxy/infrastructure/entities/proxy-categories.orm-entity';
import { BaseOrmEntity } from '~shared/common/orm-entities/base.orm-entity';

@Entity('categories')
@Tree('closure-table') // You could also use 'materialized-path' if needed
export class CategoryOrmEntity extends BaseOrmEntity {
  @Column()
  name: string;

  @TreeParent()
  parent: CategoryOrmEntity | null;

  @Column({ nullable: true })
  parentId: string | null;

  @TreeChildren()
  children: CategoryOrmEntity[];

  @OneToMany(
    () => ProxyCategoriesOrmEntity,
    (proxyCategories) => proxyCategories.category,
  )
  proxyCategories: ProxyCategoriesOrmEntity[];
}
