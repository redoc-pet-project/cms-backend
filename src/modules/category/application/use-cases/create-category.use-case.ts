import { Injectable } from '@nestjs/common';
import { Category } from '~modules/category/domain/entities/category.entity';
import { ICategoryRepository } from '~modules/category/domain/repositories/category.repository';

@Injectable()
export class CreateCategoryUseCase {
    constructor(private readonly repo: ICategoryRepository) { }

    async execute(name: string, parentId?: string | null): Promise<Category> {
        const category = Category.create(name, parentId);
        return this.repo.save(category);
    }
}
