import { Column, Entity } from "typeorm";
import { BaseOrmEntity } from "~shared/common/orm-entities/base.orm-entity";

@Entity('users')
export class UserOrmEntity extends BaseOrmEntity {

    @Column()
    displayName: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;


}