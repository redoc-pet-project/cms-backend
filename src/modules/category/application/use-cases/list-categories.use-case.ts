import { Injectable } from '@nestjs/common';
import { NestedCategoryDto } from '~modules/category/application/dto/nested-category.dto';
import { buildTree } from '~modules/category/interface/utils/build-tree.util';
import { ICategoryRepository } from '../../domain/repositories/category.repository';

@Injectable()
export class ListCategoriesUseCase {
    constructor(private readonly repo: ICategoryRepository) { }

    async execute(): Promise<NestedCategoryDto[]> {
        const data = await this.repo.findAll();

        return buildTree(data);
    }
}
