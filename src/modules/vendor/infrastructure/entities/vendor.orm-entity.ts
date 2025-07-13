import { Column, Entity } from "typeorm";
import { BaseOrmEntity } from "~shared/common/orm-entities/base.orm-entity";

@Entity('vendors')
export class VendorOrmEntity extends BaseOrmEntity {
    @Column()
    name: string
}