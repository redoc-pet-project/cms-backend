import { Injectable } from '@nestjs/common';
import { ICategoryRepository } from '~modules/category/domain/repositories/category.repository';
import { NotFound } from '~shared/common/exceptions/not-found.exception';

@Injectable()
export class SoftDeleteCategoryUseCase {
    constructor(private readonly repo: ICategoryRepository) { }

    async execute(id: string): Promise<void> {
        const category = await this.repo.findById(id);
        if (!category || category.deletedAt) throw new NotFound();

        await this.repo.softDelete(id);
    }
}
