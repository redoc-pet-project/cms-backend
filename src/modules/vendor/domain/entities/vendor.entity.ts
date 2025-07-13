import { v4 } from "uuid";
import { BaseEntity } from "~shared/common/entities/base.entity";

export class Vendor extends BaseEntity {
    constructor(
        public readonly id: string,
        public name: string,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt?: Date | null
    ) {
        super(id, createdAt, updatedAt, deletedAt)
    }

    static create(name: string): Vendor {
        const now = new Date()
        return new Vendor(v4(), name, now, now, null);
    }

    updateName(name: string): Vendor {
        return new Vendor(this.id, name, this.createdAt, new Date(), this.deletedAt);
    }

    delete(): void {
        this.deletedAt = new Date();
    }
}
