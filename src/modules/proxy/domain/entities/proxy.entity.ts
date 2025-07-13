import { v4 as uuidv4 } from 'uuid';
import { ProxyStatus, ProxyType } from '~modules/proxy/domain/enums/proxy.enum';
import { BaseEntity } from '~shared/common/entities/base.entity';

export class Proxy extends BaseEntity {
    constructor(
        id: string,
        public ip: string,
        public port: number,
        public type: ProxyType,
        public country: string,
        public status: ProxyStatus,
        public description: string | null,
        public vendorId: string,
        public categoryIds: string[],
        createdAt: Date,
        updatedAt: Date,
        deletedAt?: Date | null,
    ) {
        super(id, createdAt, updatedAt, deletedAt);
    }

    static create(props: Omit<Proxy, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Proxy {
        const now = new Date();
        return new Proxy(uuidv4(), props.ip, props.port, props.type, props.country, props.status, props.description ?? null, props.vendorId, props.categoryIds, now, now);
    }

    update(props: Partial<Omit<Proxy, 'id' | 'createdAt'>>): Proxy {
        return new Proxy(
            this.id,
            props.ip ?? this.ip,
            props.port ?? this.port,
            props.type ?? this.type,
            props.country ?? this.country,
            props.status ?? this.status,
            props.description ?? this.description,
            props.vendorId ?? this.vendorId,
            props.categoryIds ?? this.categoryIds,
            this.createdAt,
            new Date(),
            this.deletedAt,
        );
    }
}
