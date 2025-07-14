import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '~modules/category/domain/entities/category.entity';
import { ICategoryRepository } from '~modules/category/domain/repositories/category.repository';

import { CategoryOrmEntity } from '../entities/category.orm-entity';

@Injectable()
export class CategoryRepositoryImpl implements ICategoryRepository {
    constructor(
        @InjectRepository(CategoryOrmEntity)
        private readonly ormRepo: Repository<CategoryOrmEntity>,
    ) { }

    async save(category: Category): Promise<Category> {
        const entity = this.toOrm(category);
        const saved = await this.ormRepo.save(entity);
        return this.toDomain(saved);
    }

    async update(id: string, category: Category): Promise<boolean> {
        const result = await this.ormRepo.update(id, this.toOrm(category));
        return !!result.affected;
    }

    async findById(id: string): Promise<Category | null> {
        const found = await this.ormRepo.findOne({ where: { id } });
        return found ? this.toDomain(found) : null;
    }

    async findAll(): Promise<Category[]> {
        const list = await this.ormRepo.find();
        return list.map(this.toDomain);
    }

    async softDelete(id: string): Promise<void> {
        await this.ormRepo.softDelete(id);
    }

    // -----------------------
    // Mapping Helpers
    // -----------------------

    private toOrm(domain: Category): CategoryOrmEntity {
        const orm = new CategoryOrmEntity();
        orm.id = domain.id;
        orm.name = domain.name;
        orm.parentId = domain.parentId;
        orm.createdAt = domain.createdAt;
        orm.updatedAt = domain.updatedAt;
        orm.deletedAt = domain.deletedAt ?? null;
        return orm;
    }

    private toDomain(orm: CategoryOrmEntity): Category {
        return new Category(
            orm.id,
            orm.name,
            orm.parentId,
            orm.createdAt,
            orm.updatedAt,
            orm.deletedAt,
        );
    }
}
