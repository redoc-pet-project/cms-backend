import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from '~modules/vendor/domain/entities/vendor.entity';
import { IVendorRepository } from '~modules/vendor/domain/repositories/vendor.repository';

import { VendorOrmEntity } from '../entities/vendor.orm-entity';

@Injectable()
export class VendorRepositoryImpl implements IVendorRepository {
  constructor(
    @InjectRepository(VendorOrmEntity)
    private readonly repo: Repository<VendorOrmEntity>,
  ) {}

  async save(vendor: Vendor): Promise<Vendor> {
    const orm = this.repo.create(vendor);
    const saved = await this.repo.save(orm);
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<Vendor | null> {
    const entity = await this.repo.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(): Promise<Vendor[]> {
    const entities = await this.repo.find({
      order: {
        updatedAt: 'DESC',
      },
    });
    return entities.map(this.toDomain);
  }

  async softDelete(id: string): Promise<void> {
    await this.repo.softDelete(id);
  }

  async findByName(name: string): Promise<Vendor | null> {
    const entity = await this.repo
      .createQueryBuilder('vendor')
      .where('LOWER(vendor.name) = LOWER(:name)', { name })
      .getOne();

    return entity ? this.toDomain(entity) : null;
  }

  private toDomain(e: VendorOrmEntity): Vendor {
    return new Vendor(e.id, e.name, e.createdAt, e.updatedAt, e.deletedAt);
  }

  async update(id: string, vendor: Vendor): Promise<boolean> {
    const updatedRes = await this.repo.update(id, vendor);
    return !!updatedRes.affected;
  }
}
