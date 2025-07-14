import { v4 as uuidv4 } from 'uuid';
import { BaseEntity } from '~shared/common/entities/base.entity';

export class Category extends BaseEntity {
    constructor(
        id: string,
        public name: string,
        public parentId: string | null,
        createdAt: Date,
        updatedAt: Date,
        deletedAt?: Date | null,
    ) {
        super(id, createdAt, updatedAt, deletedAt);
    }

    static create(name: string, parentId?: string | null): Category {
        const now = new Date();
        return new Category(uuidv4(), name, parentId ?? null, now, now, null);
    }

    update(dto: { name?: string; parentId: string | null } = { name: '', parentId: null }): Category {
        return new Category(
            this.id,
            dto.name || this.name,
            dto.parentId || this.parentId,
            this.createdAt,
            new Date(),
            this.deletedAt
        );
    }
}
