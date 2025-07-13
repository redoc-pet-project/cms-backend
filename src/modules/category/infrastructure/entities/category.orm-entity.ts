import {
    Column,
    Entity,
    Tree,
    TreeChildren,
    TreeParent
} from 'typeorm';
import { BaseOrmEntity } from '~shared/common/orm-entities/base.orm-entity';

@Entity('categories')
@Tree('closure-table') // You could also use 'materialized-path' if needed
export class CategoryOrmEntity extends BaseOrmEntity {
    @Column()
    name: string;

    @TreeParent()
    parent: CategoryOrmEntity | null;

    @TreeChildren()
    children: CategoryOrmEntity[];

    // @ManyToOne(() => )
}
