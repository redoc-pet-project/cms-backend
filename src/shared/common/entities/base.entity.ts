export class BaseEntity {
    constructor(
        public readonly id: string,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt?: Date | null
    ) { }
}