import { v4 } from "uuid";
import { BaseEntity } from "~shared/common/entities/base.entity";

export class User extends BaseEntity {
    constructor(
        public readonly id: string,
        public username: string,
        public password: string,
        public displayName: string,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt?: Date | null,
    ) {
        super(id, createdAt, updatedAt, deletedAt);
    }

    static create(props: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): User {
        const now = new Date()
        return new User(v4(), props.username, props.password, props.displayName, now, now, null);
    }
}