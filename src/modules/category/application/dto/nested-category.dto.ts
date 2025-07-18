import { Category } from '~modules/category/domain/entities/category.entity';
import { CategoryOrmEntity } from '~modules/category/infrastructure/entities/category.orm-entity';

export class NestedCategoryDto {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  children: NestedCategoryDto[];

  static create(entity: Category): NestedCategoryDto {
    return {
      id: entity.id,
      name: entity.name,
      parentId: entity.parentId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
      children: [],
    };
  }

  static fromOrmEntity(entity: CategoryOrmEntity): NestedCategoryDto {
    return {
      id: entity.id,
      name: entity.name,
      parentId: entity.parentId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
      children: [],
    };
  }
}
