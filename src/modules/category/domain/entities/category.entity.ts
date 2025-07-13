import { v4 as uuidv4 } from 'uuid';
import { Proxy } from '~modules/proxy/domain/entities/proxy.entity';
import { BaseEntity } from '~shared/common/entities/base.entity';

export class Category extends BaseEntity {
    constructor(
        id: string,
        public name: string,
        public parentId: string | null,
        public proxies: Proxy[],
        createdAt: Date,
        updatedAt: Date,
        deletedAt?: Date | null,
    ) {
        super(id, createdAt, updatedAt, deletedAt);
    }

    static create(name: string, parentId?: string | null): Category {
        const now = new Date();
        return new Category(uuidv4(), name, parentId ?? null, [], now, now, null);
    }

    updateName(newName: string): Category {
        return new Category(this.id, newName, this.parentId, this.proxies, this.createdAt, new Date(), this.deletedAt);
    }
}
