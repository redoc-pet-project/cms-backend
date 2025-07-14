import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCategoryUseCase } from './application/use-cases/create-category.use-case';
import { ListCategoriesUseCase } from './application/use-cases/list-categories.use-case';
import { SoftDeleteCategoryUseCase } from './application/use-cases/soft-delete-category.use-case';
import { UpdateCategoryUseCase } from './application/use-cases/update-category.use-case';
import { ICategoryRepository } from './domain/repositories/category.repository';
import { CategoryOrmEntity } from './infrastructure/entities/category.orm-entity';
import { CategoryRepositoryImpl } from './infrastructure/repositories/category.repository.impl';
import { CategoryController } from './interface/controllers/category.controller';

@Module({
    imports: [TypeOrmModule.forFeature([CategoryOrmEntity])],
    controllers: [CategoryController],
    providers: [
        CreateCategoryUseCase,
        UpdateCategoryUseCase,
        SoftDeleteCategoryUseCase,
        ListCategoriesUseCase,
        { provide: ICategoryRepository, useClass: CategoryRepositoryImpl },
    ],
})
export class CategoryModule { }
